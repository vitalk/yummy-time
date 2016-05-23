import Ember from 'ember';

export function unique(iter, attr) {
  let seen = [];
  return iter.filter((i) => {
    let value = i.get(attr);
    if (seen.contains(value)) return false;
    seen.push(value);
    return true;
  });
}

export default Ember.Helper.extend({
  compute([attr, iter]) {
    return unique(iter, attr);
  }
});
