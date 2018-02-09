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
  layout,
  intl: service(),
  itemService: service('items-service'),
  classNames: [ 'item-picker', 'clearfix', 'row' ],

  /**
   * Startup the component... we may need to issue an immediate search...
   */
  init () {
    this._super(...arguments);
    this.set('itemsToAdd', []);
    if (this.get('searchItemsOnInit')) {
      if (this.get('catalog')) {
        this._setInitialCatalog(this.get('catalog'));
      }
      this._doSearch(this.get('q'));
    }
  },

  disableAddItems: not('hasItemsToAdd'),
  showNoItemsMsg: notEmpty('noItemsFoundMsg'),
  hasItemsToAdd: notEmpty('itemsToAdd'),
  isValidating: false,
  selectAnyway: false,
  shouldValidate: false,

  /**
   * Compute the translation scope
   */
  _i18nScope: computed('i18nScope', function () {
    return `${this.getWithDefault('i18nScope', 'ember-arcgis-portal-components.itemPicker')}.`;
  }),

  /**
   * Allow a loading component to be specified as a parameter
   */
  loadingComponent: computed('loadingComponentName', function () {
    let result = 'loading-indicator';
    if (this.get('loadingComponentName')) {
      result = this.get('loadingComponentName');
    }
    return result;
  }),

  /**
   * Determine what preview component to use. This allows us to create
   * per-type UX for the preview
   */
  previewComponent: computed('currentItem', function () {
    let type = this.get('currentItem.type');
    let componentName = 'item-picker/item-preview';

    switch (type.toLowerCase()) {
      case 'feature service':
      case 'map service':
        componentName = 'item-picker/feature-service-preview';
        break;
    }
    return componentName;
  }),

  inputElementId: computed(function () {
    return `${this.get('elementId')}-search-items`;
  }),

  placeholder: computed('_i18nScope', function () {
    return this.get('intl').t(`${this.get('_i18nScope')}searchItems`);
  }),

  query: '',

  pageSize: computed(function () {
    return this.get('rowCount') || 10;
  }),

  items: A([]),

  totalCount: reads('items.total'),

  pageNumber: computed('items.start', 'items.total', function () {
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
      currentItem: null,
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

    // allow portalOpts to be passed in so we can access
    // other portals besides the one our session is auth'd to
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
    onItemClick (item) {
      if (this.get('selectMultiple')) {
        const itemsToAdd = this.get('itemsToAdd');
        const existingObj = itemsToAdd.findBy('id', item.id);
        if (!existingObj) {
          itemsToAdd.pushObject(item);
        } else {
          itemsToAdd.removeObject(existingObj);
        }
      } else {
        if (this.get('currentItem.id') === item.id) {
          this.set('currentItem', null);
        } else {
          this.setProperties({
            errorHash: null,
            selectAnyway: false,
            currentItem: item
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

    cancelAction () {
      this.setProperties({
        errorHash: null,
        selectAnyway: false,
        currentItem: null,
        itemsToAdd: []
      });
    }
  },
});
