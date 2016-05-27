import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service(),

  actions: {
    send(message, order) {
      this.get('notifications').sendOrderNotification(message, order.id);
      this.transitionToRoute('order.index', order.id);
    }
  }
});
