import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('b-order-description', 'Integration | Component | b order description', {
  integration: true
});

const orderStub = Ember.Object.create({
  location: 'location',
  time: 'time',
  vendor: { title: 'vendor title' },
  manager: { displayName: 'displayName' },
  money: { available: 0, total: 42 },
  isReady: true
});

test('should render order', function(assert) {
  this.set('order', orderStub);
  this.render(hbs`{{b-order-description order=order}}`);

  assert.equal(this.$('.b-order__place').text().trim(), 'vendor title');
  assert.equal(this.$('.b-order__time').text().trim(), 'time');
  assert.equal(this.$('.b-person__name').text().trim(), 'displayName/location');
  assert.equal(this.$('.b-order-money__available').text(), '0');
  assert.equal(this.$('.b-order-money__total').text(), '42');
});
