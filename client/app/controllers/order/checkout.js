import Ember from 'ember';
import { unique } from '../../helpers/unique';

export default Ember.Controller.extend({
  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions'),

  orderPortions: Ember.computed('order.portions.[]', 'order.portions.@each.deleted', function() {
    return this.get('order.portions').filter((portion) => {
      return (!portion.get('deleted') && portion.get('paid'));
    })
  }),
  orderProducts: Ember.computed('orderPortions', function() {
    const res = this.get('orderPortions').map((portion) => portion.get('product'));
    return unique(res, 'id');
  }),

  totalCost: Ember.computed('orderPortions', function() {
    return this.get('orderPortions').reduce((sum, portion) => {
      return sum + portion.get('cost');
    }, 0);
  })
});
