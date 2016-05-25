import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-empty-dish', 'Integration | Component | i empty dish', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-empty-dish}}`);
  assert.ok(this.$().find('.i-empty-dish').length);
});
