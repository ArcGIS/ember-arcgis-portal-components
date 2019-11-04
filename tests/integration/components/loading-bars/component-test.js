import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | loading bars', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');
    return intl.setLocale('en-us');
  });

  test('it renders', async function (assert) {
    assert.expect(1);
    await render(hbs`{{loading-bars}}`);
    assert.equal(find('*').textContent.trim(), 'Loading...');
  });
});
