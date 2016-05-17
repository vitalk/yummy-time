import { moduleForModel, test } from 'ember-qunit';

moduleForModel('portion', 'Unit | Model | portion', {
  needs: ['model:account', 'model:order', 'model:product']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
