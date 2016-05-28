import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['b-order__actions'],

  session: Ember.inject.service(),

  canCheckout: Ember.computed('order.{active,isReady,deleted}', 'session.account.id', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            this.get('order.isReady') && !this.get('order.deleted'));
  }),

  canNotify: Ember.computed('order.deleted', 'session.account.id', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            !this.get('order.deleted'));
  })
});
