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

/**
 * loading-indicator component
 *
 * Default Usage
 * {{loading-indicator}} - will pull in a default translated message
 *
 * Passing a custom message
 * {{loading-indicator message=(t 'some.translation.key')}}
 *
 * No Message - no message is shown
 * {{loading-indicator noMessage=true}}
 */

export default Ember.Component.extend({
  layout,
  intl: Ember.inject.service(),

  tagName: 'div',
  classNames: [ 'loader' ],
  classNameBindings: [ 'isActive' ],

  // default message
  message: '',
  isActive: true,

  msg: Ember.computed('message', function () {
    let message = this.getWithDefault('message', '');
    if (!message && !this.get('noMessage')) {
      message = this.get('intl').findTranslationByKey('addons.components.loadingIndicator.defaultMessage');
    }
    return message;
  })

});
