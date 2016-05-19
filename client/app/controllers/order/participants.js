import Ember from 'ember';
import { groupBy } from '../../helpers/group-by';

export default Ember.Controller.extend({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'order.index', title: 'Блюда' }),
    Ember.Object.create({ endpoint: 'order.participants', title: 'Участники' })
  ]),

  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions'),
  nonDeletedPortions: Ember.computed.filterBy('order.portions', 'deleted', false),
  groupedPortions: Ember.computed('nonDeletedPortions', function() {
    return groupBy(this.get('nonDeletedPortions'), 'owner.id');
  }),

  actions: {
    toggleActiveState() {
      const order = this.get('order');
      order.toggleProperty('active');
      order.save();
    }
  }
});
