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

import { computed } from '@ember/object';

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

/**
 * loading-bars component
 *
 * Default Usage
 * {{loading-bars}} - will pull in a default translated message
 *
 * Passing a custom message
 * {{loading-bars message=(t 'some.translation.key')}}
 *
 * No Message - no message is shown
 * {{loading-bars noMessage=true}}
 *
 * Remove this component entirely when migrating EAPC to opendata-ui
 */

export default Component.extend({
  layout,
  intl: service(),

  tagName: 'div',
  classNames: [ 'loader-old' ],
  classNameBindings: [ 'isActive' ],

  // default message
  message: '',
  isActive: true,

  msg: computed('message', function () {
    let message = this.getWithDefault('message', '');
    if (!message && !this.get('noMessage')) {
      message = this.get('intl').findTranslationByKey('addons.components.loadingIndicator.defaultMessage');
    }
    return message;
  })

});
