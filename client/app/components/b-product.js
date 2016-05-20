import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['b-product'],
  session: Ember.inject.service(),

  portions: Ember.A(),

  myPortions: Ember.computed('portions.[]', function() {
    return this.get('portions').filter((portion) => {
      return (!portion.get('deleted') &&
              portion.get('owner.id') === this.get('session.account.id'));
    });
  }),
  myProducts: Ember.computed.mapBy('myPortions', 'product'),
  productItems: Ember.computed.filter('myProducts', function(item) {
    return item.get('id') === this.get('product.id');
  }),
  productQuantity: Ember.computed('productItems', function() {
    return this.get('productItems').length;
  }),
  inOrder: Ember.computed.gt('productQuantity', 0),

  canAdd: Ember.computed('order', function() {
    return this.get('order.active');
  }),
  canRemove: Ember.computed('order', 'inOrder', function() {
    return (this.get('inOrder') && this.get('order.active'));
  }),

  productTotal: Ember.computed('product.cost', 'productQuantity', function() {
    return this.get('productQuantity') * this.get('product.cost');
  }),

  actions: {
    add() {
      this.attrs.add();
    },

    remove() {
      this.attrs.remove();
    }
  }
});
