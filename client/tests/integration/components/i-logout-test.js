import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-logout', 'Integration | Component | i logout', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-logout}}`);
  assert.ok(this.$().find('.i-logout').length);
});
