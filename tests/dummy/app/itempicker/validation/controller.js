import $ from 'jquery';
import { copy } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import fetch from 'ember-network/fetch';

export default Controller.extend({
  selectedItem: null,

  itemService: service('items-service'),

  _isPublic (item) {
    if (item.access && item.access !== 'public') {
      return {
        item: item,
        status: {
          status: 'warning',
          message: 'Warning! This dataset is privately shared. Your applications and data will not be visible to the public'
        }
      };
    } else {
      return {
        item: item,
        status: 'ok'
      };
    }
  },

  _validator (item) {
    const copyItem = copy(item, true);
    const isHttp = /^(http:)\/\//;
    const url = `${copyItem.url.replace(/\s+/g, '')}?f=json`;

    if (isHttp.test(url)) {
      const state = this._isPublic(copyItem);
      state.item.url = url;
      return this._useHttpsIfPossible(state);
    }
    return this._request(url)
      .then((resp) => {
        return this._isPublic(copyItem);
      }, (err) => {
        if (err) {
          if (err.code === 499) {
            return {
              item: copyItem,
              status: {
                status: 'error',
                message: 'Error! The underlying service is secured. At this time we do not support secured datasets.'
              }
            };
          } else {
            return {
              item: copyItem,
              status: {
                status: 'error',
                message: 'Error! Requests to this dataset are timing out. Please check the service'
              }
            };
          }
        }
      });
  },

  _useHttpsIfPossible (state) {
    const tempState = copy(state, true);
    const httpsUrl = `https${tempState.item.url.substring(4)}`;
    return this._request(httpsUrl)
      .then((response) => {
        tempState.item.url = httpsUrl;
        return tempState;
      }, (err) => {
        if (err.code === 499) {
          tempState.status = {
            status: 'error',
            message: 'Error! The underlying service is secured. At this time we do not support secured datasets.'
          };
        } else {
          tempState.status = {
            status: 'error',
            message: 'Error! This dataset uses HTTP. We only support using HTTPS'
          };
        }
        return tempState;
      });
  },

  _request (url) {
    return fetch(url)
      .then(this.get('itemService').checkStatusAndParseJson);
  },

  actions: {
    onSelectItem (selected) {
      $('#myModal').modal('hide');
      this.set('selectedItem', selected);
    },

    selectionValidator (item) {
      return this._validator(item);
    }
  }
});
