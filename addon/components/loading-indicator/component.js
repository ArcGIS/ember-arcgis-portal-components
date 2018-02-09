import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
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

export default Component.extend({
  layout,
  intl: service(),

  tagName: 'div',
  classNames: [ 'loader' ],
  classNameBindings: [ 'isActive' ],

  // default message
  message: '',
  isActive: true,

  msg: computed('message', function () {
    let message = this.get('message') || '';
    if (!message && !this.get('noMessage')) {
      message = this.get('intl').findTranslationByKey('ember-arcgis-portal-components.loading-indicator.defaultMessage');
    }
    return message;
  })

});
