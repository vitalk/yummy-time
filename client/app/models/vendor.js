import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  rev: DS.attr('number'),
  url: DS.attr('string'),
  minOrderCost: DS.attr('number'),
  products: DS.hasMany('product'),
  affiliates: DS.attr()
});
