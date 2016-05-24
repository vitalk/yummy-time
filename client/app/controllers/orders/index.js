import Ember from 'ember';

export const OrdersController = Ember.Mixin.create({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'orders.index', title: 'Все' }),
    Ember.Object.create({ endpoint: 'orders.active', title: 'Активные' }),
    Ember.Object.create({ endpoint: 'orders.inactive', title: 'Неактивные' })
  ]),

  foundNothing: Ember.computed.empty('model')
});

export default Ember.Controller.extend(OrdersController, {});
