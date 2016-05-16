import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-close-lock', 'Integration | Component | i close lock', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-close-lock}}`);
  assert.ok(this.$().find('.i-close-lock').length);
});
