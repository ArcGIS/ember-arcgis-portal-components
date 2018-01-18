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

import Ember from 'ember';
import singleTemplate from './single/template';
import multipleTemplate from './multiple/template';

export default Ember.Component.extend({
  layout: Ember.computed('selectMultiple', function () {
    let layout = singleTemplate;
    if (this.get('selectMultiple')) {
      layout = multipleTemplate;
    }
    return layout;
  }),
  session: Ember.inject.service(),
  itemService: Ember.inject.service('items-service'),

  tagName: 'li',
  classNames: [ 'item-picker-item-results-item' ],
  classNameBindings: [ 'isSelected', 'selectMultiple' ],

  didInsertElement () {
    const el = this.$('[data-toggle="tooltip"]');
    if (el.tooltip) {
      el.tooltip();
    }
  },

  willDestroyElement () {
    const el = this.$('[data-toggle="tooltip"]');
    if (el.tooltip) {
      el.tooltip('destroy');
    }
  },

  isSelected: Ember.computed('currentItemId', 'model.id', function () {
    return this.get('currentItemId') === this.get('model.id');
  }),

  typeOfData: Ember.computed('model.type', function () {
    let type = this.get('model.type');
    switch (type) {
      case 'Feature Service':
      case 'Map Service':
        return 'Data';
      default:
        return type;
    }
  }),

  checked: Ember.computed('model.id', 'itemsToAdd.[]', function () {
    const itemsToAdd = this.get('itemsToAdd');
    return !!itemsToAdd.findBy('id', this.get('model.id'));
  }),

  url: Ember.computed('model.id', 'session.portalHostname', function () {
    return `https://${this.get('session.portalHostname')}/home/item.html?id=${this.get('model.id')}`;
  }),

  actions: {
    selectItem (item) {
      Ember.run.next(this, () => {
        this.get('onClick')(item);
      });
    },
  }

});
