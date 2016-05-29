import Ember from 'ember';

export const OrderParticipantsMixin = Ember.Mixin.create({
  participants: Ember.computed.mapBy('order.portions', 'owner'),
  recipients: Ember.computed('participants', 'order.manager.id', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('participants').filter((participant) => {
      return (participant.get('id') !== this.get('order.manager.id'));
    });
  }),
  hasRecipients: Ember.computed.notEmpty('recipients')
});

export default Ember.Component.extend(OrderParticipantsMixin, {
  tagName: 'footer',
  classNames: ['b-order__actions'],

  session: Ember.inject.service(),

  canCheckout: Ember.computed('order.{active,isReady,deleted}', 'session.account.id', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            this.get('order.isReady') && !this.get('order.deleted'));
  }),

  canNotify: Ember.computed('order.deleted', 'session.account.id', 'hasRecipients', function() {
    return (this.get('order.manager.id') === this.get('session.account.id') &&
            !this.get('order.deleted') && this.get('hasRecipients'));
  })
});
