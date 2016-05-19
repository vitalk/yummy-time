import Ember from 'ember';

export default Ember.Controller.extend({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'order.index', title: 'Блюда' }),
    Ember.Object.create({ endpoint: 'order.participants', title: 'Участники' })
  ]),

  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions')
});
