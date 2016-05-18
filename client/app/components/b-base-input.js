import Ember from 'ember';

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  classNames: ['f-default__row'],

  model: null,
  type: 'text',
  placeholder: '',
  disabled: null,
  value: null,
  valuePath: '',
  validation: null,
  isTyping: false,

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.oneWay('validation.isValid'),
  isInvalid: computed.oneWay('validation.isInvalid'),

  showMessage: computed('didValidate', 'isInvalid', function() {
    return (this.get('didValidate') && this.get('isInvalid'));
  }),

  init() {
    const valuePath = this.get('valuePath');
    this._super(...arguments); // eslint-disable-line prefer-rest-params
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  actions: {
    validateField() {
      this.get('model').validate({ on: this.get('valuePath') });
    }
  }
});
