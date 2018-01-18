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

/*
  Pagination controls that work with the opendata-api style of pagination
  Takes:
    - pageSize
    - totalCount
    - pageNumber not an index, a page number (ie, 1 based, not 0 based)
    - changePage: an action that will get called with the page number to change to
*/

export default Ember.Component.extend({

  layout,

  tagName: 'nav',

  totalPages: Ember.computed('totalCount', function () {
    return Math.ceil(this.get('totalCount') / this.get('pageSize'));
  }),

  lastPage: Ember.computed.alias('totalPages'),

  showPagination: Ember.computed.gt('totalPages', 1),

  prevPage: Ember.computed('pageNumber', function () {
    return this.get('pageNumber') - 1;
  }),

  nextPage: Ember.computed('pageNumber', function () {
    return this.get('pageNumber') + 1;
  }),

  isFirstPage: Ember.computed.equal('pageNumber', 1),

  isLastPage: Ember.computed('pageNumber', 'totalPages', function () {
    return this.get('pageNumber') >= this.get('totalPages');
  }),

  pageRange: Ember.computed('pageNumber', 'totalPages', function () {
    let result = Ember.A();

    let currentPage = this.get('pageNumber');
    let totalPages = this.get('totalPages');

    let start = (totalPages > 10 && currentPage > 6) ? currentPage - 5 : 1;
    let end = (totalPages > start + 9) ? start + 9 : totalPages;

    for (let i = start; i <= end; i++) {
      result.push({ page: i, className: (i === currentPage) ? 'active' : '' });
    }

    return result;
  }),

});
