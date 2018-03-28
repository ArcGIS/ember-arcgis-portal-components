import { resolve } from 'rsvp';
import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('item-picker/feature-service-preview', 'Integration | Component | item picker/feature service preview', {
  integration: true,
  setup () {
    let intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');

    const session = Service.extend({});
    this.register('service:session', session);
  },
  beforeEach () {
    const featureService = Service.extend({
      getLayerInfo () {
        return resolve(2);
      }
    });
    this.register('service:feature-service', featureService);
  }
});

test('it renders', function (assert) {
  const id = 'test-dataset-id';
  const item = {
    id: id,
    title: 'This is the name',
    description: 'This is the description',
    owner: 'jupe',
    modified: 1411060006000,
    type: 'Feature Service',
    url: 'https://foo.bar.baz'
  };

  this.setProperties({
    currentItem: {item: item},
    isLoading: false,
    layerList: [],
    selectedLayer: null,
    onSelectionValidator: function () {},
    onPreviewSelected: function () {},
    cancelAction: function () {},
  });

  this.render(hbs`{{item-picker/feature-service-preview
    model=currentItem
    onSelectionValidator=onSelectionValidator
    onItemSelected=onPreviewSelected
    onCancel=cancelAction
  }}`);

  const el = this.$('.item-picker-current-item-preview');
  assert.equal(el.find('h4').text().trim(), 'This is the name');
  assert.equal(el.find('span.shared-by-owner').text().trim(), 'Shared by: jupe');
  assert.equal(el.find('.item-picker-current-item-preview-description').text().trim(), 'This is the description');
  assert.equal(el.find('.item-picker-current-item-preview-meta > span').length, 4);
  assert.equal(el.find('.item-picker-current-item-preview-meta > span:nth-child(2)').text().trim(), '0');
  assert.equal(el.find('.item-picker-current-item-preview-meta > span:nth-child(3)').text().trim(), '9/18/2014');
  assert.equal(el.find('.item-picker-current-item-preview-meta > span:nth-child(4)').text().trim(), 'Feature Service');
});
