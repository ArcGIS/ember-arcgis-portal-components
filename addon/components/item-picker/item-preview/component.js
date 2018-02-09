import { computed } from '@ember/object';
import { notEmpty, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  intl: service(),

  classNames: [ 'item-picker-current-item-preview' ],

  didRender () {
    // Needed to jump to error message
    if (this.get('showError')) {
      this.$().scrollTop(0);
    }
  },

  isValidating: false,
  selectAnyway: false,
  shouldValidate: false,
  showError: notEmpty('errorMessage'),
  description: reads('model.description'),

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
   * Construct the preview url
   */
  previewUrl: computed('model', function () {
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
   * What class should be used for any messages
   */
  messageClass: computed('errorMessage', function () {
    if (this.get('errorMessage.status') === 'warning') {
      return 'alert-warning';
    } else if (this.get('errorMessage.status') === 'error') {
      return 'alert-danger';
    }
  }),

  actions: {
    onItemSelected (item) {
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
              this.get('onItemSelected')(item);
            }
          });
      } else {
        this.get('onItemSelected')(item);
      }
    }
  }

});
