import Ember from 'ember';
import { OrderParticipantsMixin } from './b-order-actions';
import { validator, buildValidations } from 'ember-cp-validations';

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

  recipientNames: Ember.computed.mapBy('recipients', 'displayName'),

  // eslint-disable-next-line consistent-return
  note: Ember.computed('recipientNames', function() {
    const recipients = this.get('recipientNames').uniq();
    const sep = { comma: ', ', and: ' и ' };

    if (recipients.length === 1) {
      const name = recipients[0];
      return `${name} получит это сообщение`;
    } else if (recipients.length > 1) {
      const tail = [recipients.pop(), recipients.pop()].join(sep.and);
      const head = recipients.join(sep.comma);
      const names = ((head) ? [head, tail] : [tail]).join(sep.comma);
      return `${names} получат это сообщение`;
    }
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
