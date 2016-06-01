import { prettyPrint } from 'client/helpers/pretty-print';
import { module, test } from 'qunit';

module('Unit | Helper | pretty print');

test('it works', function(assert) {
  let result = prettyPrint([42]);
  assert.ok(result);
});
