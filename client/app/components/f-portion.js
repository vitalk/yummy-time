import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  product: {
    validators: [
      validator('presence', {
        presence: true,
        dependentKeys: ['text', 'cost'],
        disabled() {
          return (Ember.isPresent(this.get('model.text')) &&
                  Ember.isPresent(this.get('model.cost')));
        }
      })
    ]
  },

  text: {
    validators: [
      validator('presence', {
        presence: true,
        dependentKeys: ['product'],
        disabled() {
          return Ember.isPresent(this.get('model.product'));
        }
      })
    ]
  },

  cost: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        positive: true,
        integer: true
      })
    ]
  }
});

export default Ember.Component.extend(Validations, {
  session: Ember.inject.service(),

  didValidate: false,
  product: null,
  productSelected: null,

  actions: {
    selectProduct(product) {
      this.set('product', product);

      if (product) {
        this.set('productSelected', true);
        this.set('cost', product.get('cost'));
      } else {
        this.set('productSelected', null);
        this.set('cost', null);
      }
    },

    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.attrs.submit(
            this.get('session.account'),
            this.get('product'),
            this.getProperties('text', 'cost')
          );
        }
        this.set('didValidate', true);
      });
    }
  }
});
