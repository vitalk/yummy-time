import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order', 'Unit | Model | order', {
  needs: ['model:vendor', 'model:account', 'model:portion']
});

test('should set total and available money on init', function(assert) {
  let order = this.subject();
  assert.equal(order.get('money.total'), 0);
  assert.equal(order.get('money.available'), 0);
});

test('should set timestamps on init', function(assert) {
  let order = this.subject();
  assert.ok(order.get('createdAt'));
  assert.ok(order.get('updatedAt'));
});

test('is not ready when the total money less then required', function(assert) {
  let order = this.subject({ money: { total: 0, required: 42 } });
  assert.equal(order.get('isReady'), false);
});

test('is ready when money is enought', function(assert) {
  let order = this.subject({ money: { total: 42, required: 42 } });
  assert.equal(order.get('isReady'), true);
});
