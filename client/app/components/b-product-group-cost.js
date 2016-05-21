import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['b-product-cost'],
  classNameBindings: ['wrapped:b-product-cost_wrapped'],
  wrapped: true,

  products: Ember.computed('portions.[]', 'portions.@each.deleted', function() {
    return this.get('portions').filter((portion) => {
      return (portion.get('product.id') === this.get('product.id') &&
              portion.get('owner.id') === this.get('person.id'));
    })
  }),
  productQuantity: Ember.computed('products.[]', function() {
    return this.get('products').length;
  }),
  productTotalCost: Ember.computed('productQuantity', function() {
    return this.get('product.cost') * this.get('productQuantity');
  })
});
