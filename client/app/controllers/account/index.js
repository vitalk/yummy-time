import Ember from 'ember';

// eslint-disable-next-line new-cap
export const NavigationTabsMixin = Ember.Mixin.create({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'account.orders', title: 'Мои заказы' }),
    Ember.Object.create({ endpoint: 'account.index', title: 'Настройки' })
  ])
});

export default Ember.Controller.extend(NavigationTabsMixin, {
  session: Ember.inject.service(),

  actions: {
    updateAccount(account) {
      account.save();
    }
  }
});
