import Ember from 'ember';

export default Ember.Controller.extend({
  tabs: Ember.A([
    Ember.Object.create({ endpoint: 'orders.index', title: 'Все' }),
    Ember.Object.create({ endpoint: 'orders.active', title: 'Активные' }),
    Ember.Object.create({ endpoint: 'orders.inactive', title: 'Неактивные' })
  ])
});
