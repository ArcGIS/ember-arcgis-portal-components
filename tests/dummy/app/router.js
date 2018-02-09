import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('itempicker', function () {
    this.route('multiselect');
    this.route('facets');
    this.route('validation');
    this.route('portalopts');
    this.route('defaultcatalog');
    this.route('specificid');
    this.route('layerpicker');
  });

  this.route('itemPicker', function () {});
});

export default Router;
