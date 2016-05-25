import Ember from 'ember';
import { groupBy } from '../../helpers/group-by';

// eslint-disable-next-line new-cap
export const NavigationTabsMixin = Ember.Mixin.create({
  tabs: new Ember.A([
    Ember.Object.create({ endpoint: 'order.index', title: 'Блюда' }),
    Ember.Object.create({ endpoint: 'order.participants', title: 'Участники' })
  ])
});

export const ProductActionsMixin = Ember.Mixin.create({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  order: Ember.computed.alias('model.order'),
  portions: Ember.computed.alias('model.portions'),
  myPortions: Ember.computed.filter('order.portions', function(portion) {
    return portion.get('owner.id') === this.get('session.account.id');
  }),

  actions: {
    addToOrder(order, product) {
      const isManager = (this.get('session.account.id') === order.get('manager.id'));
      const attrs = { cost: product.get('cost') };
      const portion = this.get('store').createRecord('portion', attrs);
      portion.set('order', order);
      portion.set('owner', this.get('session.account'));
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
      // eslint-disable-next-line arrow-body-style
      const portions = this.get('myPortions').filter((portion) => {
        return portion.get('product.id') === product.get('id');
      });

      if (Ember.isPresent(portions)) {
        const portion = portions[0];

        // eslint-disable-next-line no-shadow
        portion.get('order').then((order) => {
          order.removePortion(portion);
          order.save().then(() => {
            portion.set('deleted', true);
            portion.save();
          });
        });
      }
    },

    toggleActiveState() {
      const order = this.get('order');
      order.toggleProperty('active');
      order.save();
    }
  }
});

export default Ember.Controller.extend(NavigationTabsMixin, ProductActionsMixin, {
  myProducts: Ember.computed.mapBy('myPortions', 'product'),
  groupedPortions: Ember.computed('order.portions.[]', function() {
    return groupBy(this.get('order.portions'), 'product.id');
  }),
  groupsSorting: ['grouper.id'],
  groups: Ember.computed.sort('groupedPortions', 'groupsSorting'),

  foundNothing: Ember.computed.empty('groups')
});
