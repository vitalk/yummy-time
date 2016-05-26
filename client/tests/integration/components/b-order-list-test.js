import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-order-list', 'Integration | Component | b order list', {
  integration: true
});

const ordersStub = new Ember.A([
  { name: 'name' }
]);

test('should support block usage', function(assert) {
  this.set('orders', ordersStub);
  this.render(hbs`
    {{#b-order-list orders=orders}}
      template block text
    {{/b-order-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('should expose order model', function(assert) {
  this.set('orders', ordersStub);
  this.render(hbs`
    {{#b-order-list orders=orders as |order|}}
      {{order.name}}
    {{/b-order-list}}
  `);

  assert.equal(this.$().text().trim(), 'name');
});
