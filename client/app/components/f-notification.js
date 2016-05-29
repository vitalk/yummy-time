import Ember from 'ember';
import { OrderParticipantsMixin } from './b-order-actions';
import { validator, buildValidations } from 'ember-cp-validations';
import { unique } from '../helpers/unique';

const Validations = buildValidations({
  message: {
    validators: [validator('presence', true)]
  }
});

export default Ember.Component.extend(Validations, OrderParticipantsMixin, {
  tagName: 'form',
  classNames: ['f-default', 'f-notification'],

  session: Ember.inject.service(),
  didValidate: false,

  uniqueRecipients: Ember.computed('recipients', function() {
    return unique(this.get('recipients'), 'id');
  }),
  recipientNames: Ember.computed.mapBy('uniqueRecipients', 'displayName'),

  // eslint-disable-next-line consistent-return
  pluralizedNote: Ember.computed('recipientNames', function() {
    const recipients = this.get('recipientNames');
    return (recipients.length === 1) ? 'получит это сообщение' : 'получат это сообщение';
  }),

  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.get('message'),
            this.get('order')
          );
          this.set('message');
        }
        this.set('didValidate', true);
      });
    }
  }
});
