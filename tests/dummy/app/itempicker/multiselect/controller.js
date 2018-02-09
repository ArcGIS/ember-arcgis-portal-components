import $ from 'jquery';
import Controller from '@ember/controller';

export default Controller.extend({
  selectedItem: null,

  actions: {
    onSelectItem (selected) {
      $('#myModal').modal('hide');
      this.set('selectedItem', selected);
    },
  }
});
