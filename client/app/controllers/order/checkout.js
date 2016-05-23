import Ember from 'ember';
import { unique } from '../../helpers/unique';

export default Ember.Controller.extend({
  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions'),
  orderProducts: Ember.computed('order.portions.[]', 'order.portions.@each.deleted', function() {
    const res = this.get('order.portions').filter((portion) => {
      return (!portion.get('deleted') && portion.get('paid'));
    }).map((portion) => portion.get('product'));
    return unique(res, 'id');
  })
});
