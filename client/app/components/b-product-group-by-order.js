import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['b-list__item', 'b-product-group'],

  productPortions: Ember.computed('portions.[]', function() {
    return this.get('portions').filter((portion) => { // eslint-disable-line arrow-body-style
      return (!portion.get('deleted') &&
              portion.get('product.id') === this.get('product.id'));
    });
  }),
  productOrders: Ember.computed.mapBy('productPortions', 'order'),
  uniqueProductOrders: Ember.computed.unique('productOrders', 'id'),

  productTotalCost: Ember.computed('productPortions.[]', function() {
    return this.get('productPortions').length * this.get('product.cost');
  })
});
