import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['b-list__item', 'b-product-group'],

  // eslint-disable-next-line max-len
  productPortions: Ember.computed('portions.[]', 'portions.@each.deleted', 'portions.@each.paid', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('portions').filter((portion) => {
      return (!portion.get('deleted') && portion.get('paid') &&
              portion.get('product.id') === this.get('product.id'));
    });
  }),
  productPersons: Ember.computed.mapBy('productPortions', 'owner'),
  uniqueProductPersons: Ember.computed.uniqueBy('productPersons', 'id'),
  productQuantity: Ember.computed('productPortions', function() {
    return this.get('productPortions').length;
  }),
  productTotalCost: Ember.computed('productQuantity', function() {
    return this.get('product.cost') * this.get('productQuantity');
  })
});
