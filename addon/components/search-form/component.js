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
import layout from './template';

export default Ember.Component.extend({
  layout,
  tagName: 'form',
  classNames: ['portal-search-form', 'form-group-tsf'],

  i18nBase: 'ember-arcgis-portal-components.',

  inputElementId: Ember.computed('elementId', function () {
    return this.get('elementId') + 'Input';
  }),

  placeholderi18nKey: Ember.computed('i18nBase', function () {
    return this.get('i18nBase') + 'itemPicker.searchItems';
  }),

  submit (e) {
    e.preventDefault();
    let query = this.get('_q');
    Ember.tryInvoke(this, 'onSearch', [query]);
  }
});
