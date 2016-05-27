import Ember from 'ember';
import { ProductActionsMixin } from '../controllers/order/index';

export default Ember.Component.extend(ProductActionsMixin, {
  tagName: 'li',
  classNames: ['b-list__item', 'b-product-group__item'],

  order: null,
  portions: null,
  myPortions: Ember.computed.filter('order.portions', function(portion) {
    return portion.get('owner.id') === this.get('session.account.id');
  }),

  orderPortions: Ember.computed('myPortions.[]', 'myPortions.@each.deleted', function() {
    return this.get('myPortions').filter((portion) => { // eslint-disable-line arrow-body-style
      return (portion.get('product.id') === this.get('product.id'));
    });
  }),
  orderProducts: Ember.computed.mapBy('orderPortions', 'product'),
  productQuantity: Ember.computed('orderProducts.[]', function() {
    return this.get('orderProducts').length;
  }),

  canAdd: false,
  canRemove: false
});
