import { unique } from 'client/helpers/unique';
import { module, test } from 'qunit';

module('Unit | Helper | unique');

const items = [
  Ember.Object.create({ foo: 1, bar: 1}),
  Ember.Object.create({ foo: 1, bar: 1}),
  Ember.Object.create({ foo: 3, bar: 1})
];

test('should remove non-unique elements by attribute', function(assert) {
  assert.equal(unique(items, 'foo').length, 2);
  assert.equal(unique(items, 'bar').length, 1);
});
