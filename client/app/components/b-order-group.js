/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  tagName: 'li',
  classNames: ['b-order-group'],

  isManager: Ember.computed('session.account.id', function() {
    const currentAccountId = this.get('session.account.id');
    const orderManagerId = this.get('order.manager.id');
    return (currentAccountId !== orderManagerId);
  }),

  canDelete: Ember.computed('session.account.id', 'order.active', function() {
    const currentAccountId = this.get('session.account.id');
    const order = this.get('order');

    if (order.get('active')) {
      return (currentAccountId === this.get('order.manager.id')) ||
             (currentAccountId === this.get('owner.id'));
    }
    return false;
  }),

  allPaid: Ember.computed('portions.@each.paid', function() {
    return this.get('portions').isEvery('paid', true);
  }),

  moneyAvailable: Ember.computed('portions.@each.paid', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('portions').reduce((sum, portion) => {
      return sum + (portion.get('paid') ? portion.get('cost') : 0);
    }, 0);
  }),

  moneyTotal: Ember.computed('portions.[]', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('portions').reduce((sum, portion) => {
      return sum + portion.get('cost');
    }, 0);
  }),

  click: (e) => {
    const target = $(e.target);

    if (target.hasClass('checkbox__text') || target.hasClass('checkbox__control')) {
      e.stopPropagation();
      return;
    }

    const elem = (e.target === this) ? target : target.parents('.b-order-group');

    if (!elem.length) {
      return;
    }

    elem.find('.b-order-group__summary').slideToggle(100);
  },

  actions: {
    removeAll() {
      const order = this.get('order');
      this.get('portions').forEach((portion) => {
        order.removePortion(portion);
        portion.set('deleted', true);
        portion.save();
      });
      order.save();
    },

    toggleAll() {
      const value = this.get('allPaid');
      const order = this.get('order');
      this.get('portions').forEach((portion) => {
        if (portion.get('paid') === value) {
          portion.set('paid', !value);
          portion.updateOrderMoney(order);
          portion.save();
        }
      });
      order.save();
    }
  }
});
