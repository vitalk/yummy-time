import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['b-order__actions'],

  session: Ember.inject.service(),

  canCheckout: Ember.computed('order.{active,isReady}', 'session.account.id', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            this.get('order.isReady'));
  }),

  canNotify: Ember.computed('session.account.id', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            true);
  })
});
