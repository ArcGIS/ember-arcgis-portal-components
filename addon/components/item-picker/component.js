/*    Copyright 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. */

import { debounce } from '@ember/runloop';

import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { not, notEmpty, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';
import queryHelpers from 'ember-arcgis-portal-components/utils/query-helpers';
import isGuid from 'ember-arcgis-portal-components/utils/is-guid';

export default Component.extend({
  classNames: [ 'item-picker', 'clearfix' ],
  classNameBindings: ['verticalFlex:item-picker-vertical-flex'],
  disableAddItems: not('hasItemsToAdd'),
  hasItemsToAdd: notEmpty('itemsToAdd'),
  intl: service(),
  isValidating: false,
  itemService: service('items-service'),
  layout,
  selectAnyway: false,
  shouldValidate: false,
  showMessage: notEmpty('currentMessage'),
  showNoItemsMsg: notEmpty('noItemsFoundMsg'),
  // responsiveHeight mode == the component will only show 8 items per page and flex with
  // the height of the screen... especially useful for responsive modals
  verticalFlex: false,
  /**
   * Startup the component... we may need to issue an immediate search...
   */
  init () {
    this._super(...arguments);
    if (!this.get('itemsToAdd')) {
      this.set('itemsToAdd', []);
    }
    if (this.get('searchItemsOnInit')) {
      if (this.get('catalog')) {
        this._setInitialCatalog(this.get('catalog'));
      }
      this._doSearch(this.get('q'));
    }
  },

  /**
   * Compute the translation scope
   */
  _i18nScope: computed('i18nScope', function () {
    return `${this.getWithDefault('i18nScope', 'addons.components.itemPicker')}.`;
  }),

  /**
   * Allow a loading component to be specified as a parameter
   */
  loadingComponent: computed('loadingComponentName', function () {
    let result = 'loading-bars';
    if (this.get('loadingComponentName')) {
      result = this.get('loadingComponentName');
    }
    return result;
  }),

  /**
   * Determine what preview component to use. This allows us to create
   * per-type UX for the preview
   */
  preview: computed('currentModel.item', function () {
    let type = this.get('currentModel.item.type');
    let componentName = 'item-picker/item-preview';

    switch (type.toLowerCase()) {
      case 'feature service':
      case 'map service':
        componentName = 'item-picker/feature-service-preview';
        break;
    }
    return componentName;
  }),

  /**
   * Determine what preview component to use. This allows us to create
   * per-type UX for the preview
   */
  row: computed('rowComponent', function () {
    return this.getWithDefault('rowComponent', 'item-picker/item-row');
  }),

  inputElementId: computed(function () {
    return `${this.get('elementId')}-search-items`;
  }),

  placeholder: computed('_i18nScope', function () {
    return this.get('intl').t(`${this.get('_i18nScope')}searchItems`);
  }),

  query: '',

  defaultPageSize: computed('disableFlexyMode', function () {
    return this.get('disableFlexyMode') ? 10 : 8;
  }),

  pageSize: computed('defaultPageSize', function () {
    return this.get('rowCount') || this.get('defaultPageSize');
  }),

  items: A([]),

  totalCount: reads('items.total'),

  pageNumber: computed('items.{start,total}', function () {
    const pageSize = this.get('pageSize');
    const start = this.get('items.start');
    return ((start - 1) / pageSize) + 1;
  }),

  hasSearched: false,

  /**
   * Do we show facets? if we have more than one entry in the catalog, yes
   */
  showFacets: computed('catalog', function () {
    const catalog = this.get('catalog');
    if (catalog && catalog.length > 1) {
      return true;
    }
    return false;
  }),

  onlyOneCataEntry: computed('catalog', 'selectedCatalog', function () {
    const catalog = this.get('catalog');
    if (catalog && catalog.length === 1) {
      return catalog[0];
    }
    return undefined;
  }),

  noItemsFoundMsg: computed('items.[]', 'q', function () {
    let result = '';
    if (this.get('hasSearched') && this.get('items.results.length') === 0) {
      let i18nKey = 'noItems.withoutQuery';
      if (!isEmpty(this.get('q'))) {
        i18nKey = 'noItems.withQuery';
      }
      i18nKey = `${this.get('_i18nScope')}${i18nKey}`;
      result = this.get('intl').t(i18nKey);
    }
    return result;
  }),

  errorMessage: computed('isValidating', 'errorHash', function () {
    const errorHash = this.get('errorHash');
    if (!this.get('isValidating') && errorHash && errorHash.status) {
      if (errorHash.status === 'warning' || errorHash.status === 'error') {
        return errorHash;
      }
    }
  }),

  _defaultSearch (q, isValidGuid) {
    let parts = [];
    if (q) {
      if (isValidGuid) {
        parts.push(`id:${q}`);
      } else {
        parts.push(`title:${q}`);
      }
    }
    let defaultQuery = this.get('defaultQuery');
    if (defaultQuery) {
      parts.push(`(${defaultQuery})`);
    }
    if (parts.length === 0) {
      // we need a q or it won't return anything...
      // this is just so that when searchItemsOnInit === true, it returns something
      parts.push('access:public');
    }
    return parts.join(' AND ');
  },

  /**
   * Execute the search
   */
  _doSearch (q, page = 1) {
    let isValidGuid = isGuid(q);
    this.setProperties({
      loading: true,
      currentModel: null,
      items: null,
    });

    const selectedCatalog = this.get('selectedCatalog') || this.get('onlyOneCataEntry');

    let query = selectedCatalog // If we have a catalog selected
      ? queryHelpers.createQuery(selectedCatalog, q, isValidGuid) // Create a query for that tab.
      : this._defaultSearch(q, isValidGuid); // Otherwise perform a normal search

    const pageSize = this.get('pageSize');
    let params = {
      q: query,
      start: ((page - 1) * pageSize) + 1,
      num: pageSize,
      sortField: 'title'
    };

    /**
     Allow portalOpts to be passed in so we can access
     other portals besides the one our session is auth'd to
    */
    this.get('itemService').search(params, this.get('portalOpts'))
      .then((resp) => {
        this.set('items', resp);
      }, (err) => {
        throw err;
      })
      .finally(() => {
        this.setProperties({
          loading: false,
          hasSearched: true,
        });
      });
  },

  /**
   * Developer can pass in a .active property on a catalog entry,
   * this code simply ensures that is the "active" catalog
   */
  _setInitialCatalog (catalog) {
    let startingCatalog = catalog[0];
    let selectedCatalog = catalog.reduce((acc, entry) => {
      if (entry.active) {
        acc = entry;
      }
      return acc;
    }, startingCatalog);

    this.set('selectedCatalog', selectedCatalog);
    this.set('selectedCatalogName', selectedCatalog.name);
  },

  /**
   * Shows the validation message if one is given
   */
  showMultiValidationMessage (data) {
    this.set('currentMessage', data.message);
    this.set('currentStatus', data.status);
  },

  actions: {
    /**
     * Fired when a facet is selected
     */
    chooseCatalog (val) {
      const selectedCatalog = this.get('catalog').findBy('name', val);
      this.set('selectedCatalogName', selectedCatalog.name);
      this.set('selectedCatalog', selectedCatalog);
      // Run search..
      this._doSearch(this.get('q'));
    },

    /**
     * When the user types in the search box, this fires...
     */
    doSearch (query) {
      const q = query;
      this.set('q', q);
      debounce(this, this._doSearch, q, 150);
    },
    /**
     * Paging
     */
    changePage (page) {
      const q = this.get('q');
      this._doSearch(q, page);
    },
    /**
     * When an item is clicked in the list
     */
    onItemClick (model) {
      if (this.get('selectMultiple')) {
        let validator = this.get('onSelectionValidator');
        const itemsToAdd = this.get('itemsToAdd');
        const existingObj = itemsToAdd.findBy('id', model.item.id);
        if (!existingObj) {
          itemsToAdd.pushObject(model.item);
        } else {
          itemsToAdd.removeObject(existingObj);
        }

        if (validator) {
          validator(model).then(response => {
            if (response.status !== 'ok') {
              this.showMultiValidationMessage(response);
            } else {
              this.set('currentMessage', null);
              this.set('currentStatus', response.status);
            }
          });
        }
      } else {
        if (this.get('currentModel.item.id') === model.item.id) {
          this.set('currentModel.item', null);
        } else {
          this.setProperties({
            errorHash: null,
            selectAnyway: false,
            currentModel: model
          });
        }
      }
    },
    /**
     * Called when user clicks "Select" in the Preview component
     */
    onPreviewSelected (item, options) {
      // call the closure action passed into this component
      return this.get('selectAction')(item, options);
    },

    /**
     * Deselects all currently selected items when in
     * multi-select mode
     */
    deselectAll () {
      this.setProperties({
        'itemsToAdd': [],
        'currentMessage': null
      });
    },

    cancelAction () {
      this.setProperties({
        errorHash: null,
        selectAnyway: false,
        currentModel: null,
        itemsToAdd: []
      });
    }
  },
});
