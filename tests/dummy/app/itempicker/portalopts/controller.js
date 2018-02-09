import { computed } from '@ember/object';
import { debug } from '@ember/debug';
import Controller from '@ember/controller';
import fetch from 'ember-network/fetch';
export default Controller.extend({

  getToken (username, password, portalBaseUrl) {
    let url = `https://${portalBaseUrl}/sharing/rest/generateToken?f=json`;
    let referer = window.location.origin;
    let options = {
      method: 'POST',
      data: {
        username: username,
        password: password,
        expiration: 21600,
        referer: referer
      }
    };
    return this.requestUrl(url, options);
  },

  encodeForm (form = {}) {
    // Ember.merge(form, this.get('defaultParams'));
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=');
    }).join('&');
  },
  /**
   * Make a request using a fully-formed url. This was added to allow
   * the hosted-fs-service to make calls to the hosted service using
   * its fully qualifed url.
   */
  requestUrl (url, options, portalOpts) {
    let opts = options || {};
    if (opts.method && opts.method === 'POST') {
      // if we are POSTing, we need to manually set the content-type because AGO
      // actually does care about this header
      if (!opts.headers) {
        opts.headers = {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      }
      // if a body was passed, we need to set the content type to multipart
      if (opts.body) {
        delete opts.headers['Content-Type'];// = 'multipart/form-data';
      }

      // if we have a data, create a formData from it
      if (opts.data) {
        var form = this.encodeForm(opts.data);
        opts.body = form;
      }
    }

    // append in the token
    // if portalOpts was provided use it even if it is undefined
    // this is so we can make unauthenticated requests by passing portalOpts without a token
    const token = portalOpts ? portalOpts.token : this.get('session.token');
    if (token) {
      // add a token
      if (url.indexOf('?') > -1) {
        url = url + '&token=' + token;
      } else {
        url = url + '?token=' + token;
      }
    }
    // Ember.debug('Portal Services making request to: ' + url);
    return fetch(url, opts)
      .then(this.checkStatusAndParseJson);
  },
  /**
   * Fetch does not reject on non-200 responses, so we need to check this manually
   */
  checkStatusAndParseJson (response) {
    let error;
    if (response.status >= 200 && response.status < 300) {
      // check if this is one of those groovy 200-but-a-400 things
      return response.json().then((json) => {
        if (json.error) {
          // cook an error
          error = new Error(json.error.message);
          error.code = json.error.code || 404;
          error.response = response;
          debug('Error in response:  ' + json.error.message);
          throw error;
        } else {
          return json;
        }
      });
    } else {
      // Response has non 200 http code
      error = new Error('Got ' + response.status + ' ' + response.statusText);
      throw error;
    }
  },
  expires: computed('model.expiresAt', function () {
    if (this.get('model.expiresAt')) {
      return new Date(this.get('model.expiresAt')).toISOString();
    } else {
      return 'Not Set';
    }
  }),

  portalOpts: computed('model.token', function () {
    if (this.get('model.token')) {
      return {
        portalHostname: this.get('model.portalBaseUrl'),
        token: this.get('model.token')
      };
    } else {
      return {
        portalHostname: this.get('session.portalHostname'),
        token: this.get('session.token')
      };
    }
  }),

  actions: {
    getToken () {
      let un = this.get('username');
      let pw = this.get('password');
      let portalBaseUrl = this.get('model.portalBaseUrl');
      return this.getToken(un, pw, portalBaseUrl)
      .then((result) => {
        this.set('model.token', result.token);
        this.set('model.expiresAt', result.expires);
      });
    },
    onSelectItem (item) {
      alert('wat');
    }
  }
});
