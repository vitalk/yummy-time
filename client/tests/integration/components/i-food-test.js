import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-food', 'Integration | Component | i food', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-food}}`);
  assert.ok(this.$().find('.i-food').length);
});
