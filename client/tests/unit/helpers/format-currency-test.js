import { formatCurrency, isNumber } from 'client/helpers/format-currency';
import { module, test } from 'qunit';

module('Unit | Helper | format currency');

test('should detect number', function(assert) {
  assert.ok(isNumber(42));
  assert.ok(isNumber(42.2));
});

test('should detect undefined value', function(assert) {
  assert.notOk(isNumber(undefined));
});

test('should ignore non-numeric input', function(assert) {
  assert.equal(formatCurrency([undefined], {}), undefined);
  assert.equal(formatCurrency(['string'], {}), 'string');
});

test('should split number into groups', function(assert) {
  assert.equal(formatCurrency([1234567], { sep: ',' }), '1,234,567');
});

test('should add thin space between groups by default', function(assert) {
  assert.equal(formatCurrency([12], {}), '12');
  assert.equal(formatCurrency([123456789], {}), '123&thinsp;456&thinsp;789');
  assert.equal(formatCurrency([1234567890], {}), '1&thinsp;234&thinsp;567&thinsp;890');
});

test('should respect custom separator', function(assert) {
  assert.equal(formatCurrency([1234], { sep: ' ' }), '1 234');
});
