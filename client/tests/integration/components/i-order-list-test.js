import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-order-list', 'Integration | Component | i order list', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-order-list}}`);
  assert.ok(this.$().find('.i-order-list').length);
});
