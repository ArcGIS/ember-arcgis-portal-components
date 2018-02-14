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
import forceHttps from 'ember-arcgis-portal-components/utils/force-https';

// NOTE: the test for this is in
// packages/opendata-ui/tests/integration/components/image-with-fallback/component-test.js
export default Ember.Component.extend({
  didInsertElement () {
    this.$().on('error', Ember.run.bind(this, this.onImageError));
  },

  willDestroyElement () {
    this.$().off();
  },

  tagName: 'img',

  attributeBindings: [ 'src', 'title', 'alt' ],

  imgIndex: 0,

  imgSrcAry: Ember.computed('imgSrc', 'fallbackSrc', function () {
    const imgSrc = this.get('imgSrc');
    const result = Ember.isArray(imgSrc) ? imgSrc : [imgSrc];
    result.push(this.get('fallbackSrc'));
    return result;
  }),

  src: Ember.computed('imgSrcAry', 'imgIndex', function () {
    const imgSrc = this.get('imgSrcAry')[this.get('imgIndex')];
    let protocol = window.location.protocol || 'http';
    return forceHttps(imgSrc, protocol);
  }),

  onImageError () {
    Ember.run(this, function () {
      if (!this.get('isDestroyed') && !this.get('isDestroying')) {
        this.incrementProperty('imgIndex');
      }
    });
  }
});
