import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-checkbox', 'Integration | Component | b checkbox', {
  integration: true
});

test('should render a checkbox', function(assert) {
  this.set('onchange', () => {});
  this.render(hbs`
    {{#b-checkbox onchange=(action onchange)}}
      template block text
    {{/b-checkbox}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
});

test('should handle change event', function(assert) {
  this.set('onchange', () => {
    assert.ok(true, 'checkbox is checked');
  });
  this.render(hbs`{{b-checkbox onchange=(action onchange)}}`);
  this.$('input').change();
});

test('should be disabled if required', function(assert) {
  this.set('onchange', () => {});
  this.set('disabled', true);
  this.render(hbs`{{b-checkbox onchange=(action onchange) disabled=disabled}}`);
  assert.ok(this.$('.checkbox').hasClass('checkbox_disabled'));
})
