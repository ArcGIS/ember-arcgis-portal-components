import { A } from '@ember/array';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import instanceInitializer from 'dummy/instance-initializers/ember-intl';

moduleForComponent('item-picker', 'Integration | Component | item picker', {
  integration: true,
  setup () {
    // manually invoke the ember-intl initializer
    instanceInitializer.initialize(this);
    let intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');
  }
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{item-picker }}`);

  assert.equal(this.$().text().trim(), 'Search items:');
});

test('it renders results', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  const item = {
    id: 'abc123',
    title: 'This is the name',
    description: 'This is the description',
    owner: 'jupe',
    modified: 1411060006000,
    type: 'Web Map'
  };
  const items = A([item]);
  this.set('items', { results: items });
  this.render(hbs`{{item-picker items=items }}`);
  assert.equal(this.$('.item-picker-item-results-item').length, 1);
  assert.ok(!this.$('.item-picker-item-results-item').hasClass('is-selected'));
  assert.equal(this.$('.item-picker-current-item').length, 0);
});
