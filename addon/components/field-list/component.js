import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  search: '',
  filteredFields: Ember.computed('search', function () {
    let result = this.get('fields');
    if (this.get('search')) {
      let search = this.get('search').toLowerCase();
      result = this.get('fields').filter((fld) => {
        return fld.name.toLowerCase().indexOf(search) > -1;
      });
    }
    return result;
  })
});
