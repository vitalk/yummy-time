import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('i-open-lock', 'Integration | Component | i open lock', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{i-open-lock}}`);
  assert.ok(this.$().find('.i-open-lock').length);
});
