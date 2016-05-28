import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rev: DS.attr('number'),
  text: DS.attr('string'),
  imageUrl: DS.attr('string'),
  cost: DS.attr('number'),
  vendor: DS.belongsTo('vendor')
});
