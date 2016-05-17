import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service(),

  actions: {
    addToOrder(order, account, product, attrs) {
      const isManager = (this.get('session.account.id') === order.get('manager.id'));
      const portion = this.store.createRecord('portion', attrs);
      portion.set('order', order);
      portion.set('owner', account);
      portion.set('product', product);

      if (isManager) {
        portion.set('paid', true);
      }

      portion.save().then(() => {
        order.addPortion(portion);
        if (isManager) {
          portion.updateOrderMoney(order);
        }
        order.save();
      });

      this.get('notifications').subscribeOrderNotification(order.id);
      this.transitionToRoute('order', order.id);
    }
  }
});
