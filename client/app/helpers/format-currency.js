import Ember from 'ember';

export function formatCurrency([number], { sep }) {
  const sep = (sep === undefined) ? '&thinsp;' : sep;
  const value = number.toString();
  const groups = value.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  return Ember.String.htmlSafe(groups.join(sep));
}

export default Ember.Helper.helper(formatCurrency);
