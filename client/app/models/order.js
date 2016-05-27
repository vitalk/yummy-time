import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  vendor: DS.belongsTo('vendor'),
  location: DS.attr('string'),
  manager: DS.belongsTo('account'),
  time: DS.attr('string'),
  money: DS.attr({ defaultValue: () => ({ total: 0, available: 0 }) }),
  portions: DS.hasMany('portion'),
  active: DS.attr('boolean', { defaultValue: true }),
  createdAt: DS.attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: DS.attr('date', { defaultValue() { return new Date(); } }),

  isReady: Ember.computed('money.total', 'money.required', function() {
    return this.get('money.total') >= this.get('money.required');
  }),

  addPortion(portion) {
    const total = this.get('money.total');
    const cost = portion.get('cost');

    this.set('money.total', total + cost);
    this.get('portions').pushObject(portion);
  },

  removePortion(portion) {
    const available = this.get('money.available');
    const total = this.get('money.total');
    const cost = portion.get('cost');

    this.set('money.total', total - cost);
    if (portion.get('paid')) {
      this.set('money.available', available - cost);
    }

    this.get('portions').removeObject(portion);
  }
});
