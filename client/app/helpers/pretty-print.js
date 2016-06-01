import Ember from 'ember';

// eslint-disable-next-line consistent-return
export function prettyPrintList(iter, { and, comma }) {
  and = (typeof and === 'undefined') ? ' и ' : and; // eslint-disable-line no-param-reassign
  comma = (typeof comma === 'undefined') ? ', ' : comma; // eslint-disable-line no-param-reassign

  if (iter.length === 1) {
    return iter;
  } else if (iter.length > 1) {
    const tail = [iter.pop(), iter.pop()].join(and);
    const head = iter.join(comma);
    return ((head) ? [head, tail] : [tail]).join(comma);
  }
}

export function prettyPrint([obj], options) {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return prettyPrintList(obj, options);
  }

  return obj;
}

export default Ember.Helper.helper(prettyPrint);
