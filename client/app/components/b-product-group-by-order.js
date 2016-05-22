import Ember from 'ember';
import { unique } from '../helpers/unique';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['b-list__item', 'b-product-group'],

  productPortions: Ember.computed('portions.[]', function() {
    return this.get('portions').filter((portion) => {
      return (!portion.get('deleted') &&
              portion.get('product.id') === this.get('product.id'));
    });
  }),
  productOrders: Ember.computed('productPortions.[]', function() {
    const res = this.get('productPortions').map((portion) => portion.get('order'));
    return unique(res, 'id');
  }),

  productTotalCost: Ember.computed('productPortions.[]', function() {
    return this.get('productPortions').length * this.get('product.cost');
  })
});
