import Ember from 'ember';

export default Ember.Controller.extend({
  selectedItem: null,

  actions: {
    onSelectItem (selected) {
      Ember.$('#myModal').modal('hide');
      this.set('selectedItem', selected);
    },
  }
});
