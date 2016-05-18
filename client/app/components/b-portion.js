import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['b-list__item b-portion'],

  actions: {
    remove(portion) {
      portion.get('order').then((order) => {
        order.removePortion(portion);
        order.save().then(() => {
          portion.set('deleted', true);
          portion.save();
        });
      });
    },

    togglePaid(portion) {
      portion.get('order').then((order) => {
        portion.toggleProperty('paid');
        portion.updateOrderMoney(order);
        portion.save();
        order.save();
      });
    }
  }
});
