import Ember from 'ember';

export function unique(iter, attr) {
  const seen = [];
  return iter.filter((i) => {
    const value = i.get(attr);
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
