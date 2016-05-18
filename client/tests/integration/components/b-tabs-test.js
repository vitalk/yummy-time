import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-tabs', 'Integration | Component | b tabs', {
  integration: true
});

test('should render tabs', function(assert) {
  this.set('tabs', [
    { endpoint: 'this', title: 'this title' }
  ]);
  this.render(hbs`{{b-tabs tabs=tabs}}`);

  let result = this.$().text().trim();
  assert.equal(result, 'this title');
});
