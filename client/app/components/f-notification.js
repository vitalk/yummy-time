import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  message: {
    validators: [validator('presence', true)]
  }
});

export default Ember.Component.extend(Validations, {
  session: Ember.inject.service(),
  didValidate: false,

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
