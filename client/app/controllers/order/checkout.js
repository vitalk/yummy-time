import Ember from 'ember';
import { unique } from '../../helpers/unique';

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
  orderProducts: Ember.computed('orderPortions', function() {
    const res = this.get('orderPortions').map((portion) => portion.get('product'));
    return unique(res, 'id');
  }),

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
