import Ember from 'ember';

// eslint-disable-next-line new-cap
export const NavigationTabsMixin = Ember.Mixin.create({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'account.orders', title: 'Мои заказы' }),
    Ember.Object.create({ endpoint: 'account.products', title: 'Мои блюда' })
  ])
});

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    updateAccount(account) {
      account.save();
    }
  }
});
