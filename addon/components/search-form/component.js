import { tryInvoke } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['portal-search-form', 'form-group-tsf'],

  i18nBase: 'ember-arcgis-portal-components.',

  inputElementId: computed('elementId', function () {
    return this.get('elementId') + 'Input';
  }),

  placeholderi18nKey: computed('i18nBase', function () {
    return this.get('i18nBase') + 'itemPicker.searchItems';
  }),

  submit (e) {
    e.preventDefault();
    let query = this.get('_q');
    tryInvoke(this, 'onSearch', [query]);
  }
});
