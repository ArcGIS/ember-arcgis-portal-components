import $ from 'jquery';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  selectedItem: null,

  itemService: service('items-service'),

  actions: {
    onSelectItem (selected) {
      $('#myModal').modal('hide');
      this.set('selectedItem', selected);
    }
  }
});
