import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-empty-dishes', 'Integration | Component | i empty dishes', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-empty-dishes}}`);
  assert.ok(this.$().find('.i-empty-dishes').length);
});
