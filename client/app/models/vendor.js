import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  minOrderCost: DS.attr('number'),
  products: DS.hasMany('product')
});
