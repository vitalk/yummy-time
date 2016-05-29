import Ember from 'ember';

export default Ember.Controller.extend({
  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions'),

  // eslint-disable-next-line max-len
  orderPortions: Ember.computed('order.portions.[]', 'order.portions.@each.deleted', 'order.portions.@each.paid', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('order.portions').filter((portion) => {
      return (!portion.get('deleted') && portion.get('paid'));
    });
  }),
  orderProducts: Ember.computed.mapBy('orderPortions', 'product'),
  uniqueOrderProducts: Ember.computed.unique('orderProducts', 'id'),

  totalCost: Ember.computed('orderPortions', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('orderPortions').reduce((sum, portion) => {
      return sum + portion.get('cost');
    }, 0);
  }),

  isReady: Ember.computed.bool('order.isReady'),

  actions: {
    removeOrder(order) {
      order.set('deleted', true);
      order.save().then(() => {
        this.transitionToRoute('orders');
      });
    }
  }
});
