import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-noodles', 'Integration | Component | i noodles', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-noodles}}`);
  assert.ok(this.$().find('.i-noodles').length);
});
