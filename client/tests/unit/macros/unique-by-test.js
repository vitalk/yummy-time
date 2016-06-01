import { excludeDuplicates, uniqueBy } from 'client/macros/unique-by';
import { module, test } from 'qunit';

module('Unit | Macros | uniqueBy');

const items = new Ember.A([
  Ember.Object.create({ foo: 1, bar: 1}),
  Ember.Object.create({ foo: 1, bar: 1}),
  Ember.Object.create({ foo: 3, bar: 1})
]);

test('should remove non-unique elements by attribute', function(assert) {
  assert.equal(excludeDuplicates(items, 'foo').length, 2);
  assert.equal(excludeDuplicates(items, 'bar').length, 1);
});

test('should define a computed property', function(assert) {
  let Component = Ember.Object.extend({
    items: items,
    uniqueFooItems: uniqueBy('items', 'foo'),
    uniqueBarItems: uniqueBy('items', 'bar')
  });
  let component = Component.create();

  assert.equal(component.get('uniqueFooItems.length'), 2);
  assert.equal(component.get('uniqueBarItems.length'), 1);
})
