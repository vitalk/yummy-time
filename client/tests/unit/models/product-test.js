import { moduleForModel, test } from 'ember-qunit';

moduleForModel('product', 'Unit | Model | product', {
  needs: ['model:vendor']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
