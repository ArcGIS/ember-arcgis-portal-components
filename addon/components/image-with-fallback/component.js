import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import { bind, run } from '@ember/runloop';
import Component from '@ember/component';
import forceHttps from 'ember-arcgis-portal-components/utils/force-https';

// NOTE: the test for this is in
// packages/opendata-ui/tests/integration/components/image-with-fallback/component-test.js
export default Component.extend({
  didInsertElement () {
    this.$().on('error', bind(this, this.onImageError));
  },

  willDestroyElement () {
    this.$().off();
  },

  tagName: 'img',

  attributeBindings: [ 'src', 'title', 'alt' ],

  imgIndex: 0,

  imgSrcAry: computed('imgSrc', 'fallbackSrc', function () {
    const imgSrc = this.get('imgSrc');
    const result = isArray(imgSrc) ? imgSrc : [imgSrc];
    result.push(this.get('fallbackSrc'));
    return result;
  }),

  src: computed('imgSrcAry', 'imgIndex', function () {
    const imgSrc = this.get('imgSrcAry')[this.get('imgIndex')];
    let protocol = window.location.protocol || 'http';
    return forceHttps(imgSrc, protocol);
  }),

  onImageError () {
    run(this, function () {
      if (!this.get('isDestroyed') && !this.get('isDestroying')) {
        this.incrementProperty('imgIndex');
      }
    });
  }
});
