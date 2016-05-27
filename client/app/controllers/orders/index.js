import Ember from 'ember';

export const OrdersMixin = Ember.Mixin.create({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'orders.index', title: 'Все' }),
    Ember.Object.create({ endpoint: 'orders.active', title: 'Активные' }),
    Ember.Object.create({ endpoint: 'orders.inactive', title: 'Неактивные' })
  ]),

  foundNothing: Ember.computed.empty('model')
});

export const SortableMixin = Ember.Mixin.create({
  ordersSorting: ['createdAt:desc'],
  orders: Ember.computed.sort('model', 'ordersSorting')
});

export default Ember.Controller.extend(OrdersMixin, SortableMixin, {});
