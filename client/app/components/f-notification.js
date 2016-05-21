import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  message: {
    validators: [validator('presence', true)]
  }
});

export default Ember.Component.extend(Validations, {
  tagName: 'form',
  classNames: ['f-default', 'f-notification'],

  session: Ember.inject.service(),
  didValidate: false,

  participants: Ember.computed.mapBy('order.portions', 'owner'),
  recipients: Ember.computed('participants', 'order.manager.id', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('participants').filter((participant) => {
      return (participant.get('id') !== this.get('order.manager.id'));
    });
  }),
  recipientNames: Ember.computed.mapBy('recipients', 'displayName'),

  showNote: Ember.computed.notEmpty('recipients'),
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
            this.getProperties('message'),
            this.get('order')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
