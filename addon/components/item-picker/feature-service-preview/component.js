import { debug } from '@ember/debug';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { reads, alias, notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({

  classNames: [ 'item-picker-current-item-preview' ],
  description: reads('model.description'),
  featureService: service('feature-service'),
  forceLayerSelection: alias('showLayers'),
  hasSelectedLayer: notEmpty('selectedLayer'),
  intl: service(),
  isLoading: true,
  isValidating: false,
  itemService: service('items-service'),
  layout,
  selectAnyway: false,
  shouldValidate: false,
  showError: notEmpty('errorMessage'),

  /**
   * What should the select button text be? we have variations depending on status
   */
  selectButtonText: computed('isValidating', 'selectAnyway', function () {
    const intl = this.get('intl');
    let key = 'buttons.select';
    if (this.get('isValidating')) {
      key = 'buttons.validating';
    } else if (this.get('selectAnyway')) {
      key = 'buttons.selectAnyway';
    }
    return intl.t(`${this.get('_i18nScope')}${key}`);
  }),

  /**
  * Show layers if we have...
  * ... a map service
  * ... a feature service
  */

  showLayers: computed('model.type', function () {
    const type = this.get('model.type');
    switch (type.toLowerCase()) {
      case 'feature service':
      case 'map service':
        return true;
      default:
        return false;
    }
  }),

  /**
   * Construct the preview url
   */
  previewUrl: Ember.computed('model', function () {
    const item = this.get('model');
    let previewURL;
    // if the item has a url property, use that...
    if (item.url) {
      previewURL = item.url;
    } else {
      // compute a url based on the type...
      const protocol = '//';
      let host = this.get('session.portalHostname');
      switch (item.type.toLowerCase()) {
        case 'web map':
          previewURL = `${protocol}${host}/home/webmap/viewer.html?webmap=${item.id}`;
          break;
        default:
          previewURL = `${protocol}${host}/home/item.html?id=${item.id}`;
      }
    }
    return previewURL;
  }),

  /**
   * Disable the select button if...
   * ... we have an error
   * ... we need to choose a layer, and have not selected one
   */
  isSelectDisabled: computed('forceLayerSelection', 'selectedLayer', 'isValidating', 'errorMessage.status', function () {
    const errorMessage = this.get('errorMessage');
    let result = false;
    if (this.get('isValidating')) {
      result = true;
    }
    if (errorMessage && errorMessage.status && errorMessage.status === 'error') {
      result = true;
    } else {
      if (this.get('forceLayerSelection') && this.get('selectedLayer') === null) {
        result = true;
      }
    }
    return result;
  }),

  /**
   * Upgrade the protocol if we know we can...
   */
  upgradeProtocol (url) {
    // if already https, just return now...
    if (url.indexOf('https') > -1) {
      return {
        safe: true,
        url: url
      };
    }
    // it's a safe upgrade if the domain is in this list...
    const upgradeableDomains = ['arcgis.com', 'arcgisonline.com'];
    let canUpgradeSafely = upgradeableDomains.reduce((acc, entry) => {
      if (url.indexOf(entry) > -1) {
        acc = true;
      }
      return acc;
    }, false);
    url = url.replace(/^http:/i, 'https:');
    return {
      safe: canUpgradeSafely,
      url: url
    };
  },

  /**
   * Delegate to featureService to get the layer info
   * for the service. Feature Service will handle auth
   */
  fetchServiceLayers (serviceItem) {
    const featureService = this.get('featureService');
    // upgrade the url and re-assign it to the item...
    let upgradeInfo = this.upgradeProtocol(serviceItem.url);
    serviceItem.url = upgradeInfo.url;

    // if the last segment of the url isNaN, we have a service url
    let isService = false;
    if (isNaN(serviceItem.url.split('/').reverse()[0])) {
      isService = true;
    }
    return featureService.getLayerInfo(serviceItem.url)
      .then((result) => {
        let layersAndTables = [];
        if (isService) {
          if (result.layers) {
            layersAndTables = result.layers.concat(result.tables);
          }
        } else {
          // we need to make something that looks like a layer out of the getLayerInfo
          layersAndTables.push(result);
        }

        // if we only have one... select it...
        if (layersAndTables.length === 1) {
          layersAndTables[0].checked = true;
          this.set('selectedLayer', layersAndTables[0]);
        } else {
          this.set('selectedLayer', null);
        }

        return layersAndTables;
      })
      .catch((err) => {
        // if we did an unsafe protocol upgrade, assume that's the problem
        if (!upgradeInfo.safe) {
          // get the error string
          let intl = this.get('intl');
          throw new Error(intl.t(`${this.get('_i18nScope')}errors.httpsNotSupported`));
        } else {
          throw err;
        }
      });
  },

  /**
   * When the item is changed... re-fetch the layers and tables
   */
  onItemChanged () {
    let item = this.get('model');
    this.set('isLoading', true);
    this.fetchServiceLayers(item)
      .then((layersAndTables) => {
        this.setProperties({
          isLoading: false,
          errorMessage: null,
          layerList: layersAndTables
        });
      })
      .catch((err) => {
        this.setProperties({
          isLoading: false,
          layerList: [],
          selectedLayer: null,
        });
        debug(`Error fetching layers ${err}`);
        this.set('errorMessage', {
          status: 'error',
          message: err.message || 'Error accessing service.'
        });
      });
  },
  /**
   * Lifecycle hook that calls onItemChanged to do the fetch
   */
  didReceiveAttrs () {
    this._super(...arguments);
    // only do this if we are going to show the layers
    if (this.get('showLayers')) {
      const model = this.get('model');
      if (this.get('cachedModel.id') !== model.id) {
        // reset some state...
        this.set('cachedModel', model);
        this.onItemChanged();
      }
    }
  },

  didRender () {
    // Needed to jump to error message
    if (this.get('showError')) {
      this.$().scrollTop(0);
    }
  },

  /**
   * Get the translated form of the Item Type
   */
  itemType: computed('_i18nScope', 'model.type', function () {
    const itemType = this.get('model.type');
    let result = itemType;
    const key = `${this.get('_i18nScope')}shared.itemType.${itemType.camelize()}`;
    const intl = this.get('intl');
    // if we don't have a translation for it, just display it as-is
    if (intl.exists(key)) {
      result = intl.t(key);
    }
    return result;
  }),

  /**
   * What class do we use for the message...
   */
  messageClass: computed('errorMessage.status', function () {
    if (this.get('errorMessage.status') === 'warning') {
      return 'alert-warning';
    } else if (this.get('errorMessage.status') === 'error') {
      return 'alert-danger';
    }
  }),

  actions: {
    /**
     * Fires when a layer is selected
     */
    onLayerSelected (layer) {
      debug(`Layer selected ${layer.name}:${layer.id}`);
      this.set('selectedLayer', layer);
    },
    /**
     * When the user clicks the select button...
     */
    onServiceSelected (item) {
      let options;
      if (this.get('forceLayerSelection')) {
        options = {
          layer: this.get('selectedLayer')
        };
      }
      const validator = this.get('onSelectionValidator');

      if (validator && typeof validator === 'function' && !this.get('selectAnyway')) {
        this.set('isValidating', true);
        validator(item)
          .then((resp) => {
            this.set('isValidating', false);
            this.set('errorHash', resp.status);
            if (resp.status.status === 'error') {
              return;
            } else if (resp.status.status === 'warning') {
              this.set('selectAnyway', true);
              return;
            } else {
              this.get('onItemSelected')(item, options);
            }
          });
      } else {
        this.get('onItemSelected')(item, options);
      }
    }
  }
});
