import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  didValidate: false,
  product: null,
  productSelected: null,

  accountPortions: Ember.computed.filter('order.portions', function(portion) {
    return portion.get('owner.id') === this.get('session.account.id');
  }),

  actions: {
    addToOrder(order, account, product) {
      const isManager = (this.get('session.account.id') === order.get('manager.id'));
      const attrs = { cost: product.get('cost') };
      const portion = this.get('store').createRecord('portion', attrs);
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
    },

    removeFromOrder(order, product) {
      const portions = this.get('accountPortions').filter((portion) => {
        return portion.get('product.id') === product.get('id');
      });

      if (Ember.isPresent(portions)) {
        const portion = portions[0];

        portion.get('order').then((order) => {
          order.removePortion(portion);
          order.save().then(() => {
            portion.set('deleted', true);
            portion.save();
          });
        });
      }
    }
  }
});
