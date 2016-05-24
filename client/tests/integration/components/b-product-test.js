import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-product', 'Integration | Component | b product', {
  integration: true
});

const productStub = Ember.Object.create({
  name: 'product name',
  text: 'product text',
  cost: 42
});

test('should render product', function(assert) {
  this.set('product', productStub);
  this.render(hbs`{{b-product product=product}}`);

  assert.equal(this.$('.b-product__name').text().trim(), 'product name');
  assert.equal(this.$('.b-product__text').text().trim(), 'product text');
  assert.equal(this.$('.b-product__cost').text().trim(), '42');
});

test('should prettify product cost', function(assert) {
  this.set('product', productStub);
  this.set('product.cost', 42000);
  this.render(hbs`{{b-product product=product}}`);

  assert.equal(this.$('.b-product__cost').text().trim(), '42 000');
})
