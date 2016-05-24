import Ember from 'ember';

export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function formatCurrency([number], { sep }) {
  if (!isNumber(number)) {
    return number;
  }

  if (typeof sep === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    sep = '&thinsp;';
  }
  const value = number.toString();
  const groups = value.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  return Ember.String.htmlSafe(groups.join(sep));
}

export default Ember.Helper.helper(formatCurrency);
