import Ember from 'ember';
import { unique } from '../helpers/unique';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['b-list__item', 'b-product-group'],

  productPortions: Ember.computed('portions.[]', 'portions.@each.deleted', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('portions').filter((portion) => {
      return (!portion.get('deleted') && portion.get('paid') &&
              portion.get('product.id') === this.get('product.id'));
    });
  }),
  productPersons: Ember.computed('productPortions', function() {
    const res = this.get('productPortions').map((portion) => portion.get('owner'));
    return unique(res, 'id');
  }),
  productQuantity: Ember.computed('productPortions', function() {
    return this.get('productPortions').length;
  }),
  productTotalCost: Ember.computed('productQuantity', function() {
    return this.get('product.cost') * this.get('productQuantity');
  })
});
