import { A } from '@ember/array';
import { alias, gt, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

/*
  Pagination controls that work with the opendata-api style of pagination
  Takes:
    - pageSize
    - totalCount
    - pageNumber not an index, a page number (ie, 1 based, not 0 based)
    - changePage: an action that will get called with the page number to change to
*/

export default Component.extend({

  layout,

  tagName: 'nav',

  totalPages: computed('totalCount', function () {
    return Math.ceil(this.get('totalCount') / this.get('pageSize'));
  }),

  lastPage: alias('totalPages'),

  showPagination: gt('totalPages', 1),

  prevPage: computed('pageNumber', function () {
    return this.get('pageNumber') - 1;
  }),

  nextPage: computed('pageNumber', function () {
    return this.get('pageNumber') + 1;
  }),

  isFirstPage: equal('pageNumber', 1),

  isLastPage: computed('pageNumber', 'totalPages', function () {
    return this.get('pageNumber') >= this.get('totalPages');
  }),

  pageRange: computed('pageNumber', 'totalPages', function () {
    let result = A();

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
