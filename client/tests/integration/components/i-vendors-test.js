import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-vendors', 'Integration | Component | i vendors', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-vendors}}`);
  assert.ok(this.$().find('.i-vendors').length);
});
