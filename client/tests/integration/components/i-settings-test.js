import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-settings', 'Integration | Component | i settings', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-settings}}`);
  assert.ok(this.$().find('.i-settings').length);
});
