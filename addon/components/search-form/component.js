import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  // tagName: 'form',
  classNames: ['table-search-form'], // , 'form-group'],

  i18nBase: 'ember-arcgis-portal-components.',

  inputElementId: Ember.computed('elementId', function () {
    return this.get('elementId') + 'Input';
  }),

  placeholderi18nKey: Ember.computed('i18nBase', function () {
    return this.get('i18nBase') + 'itemPicker.searchItems';
  })
});