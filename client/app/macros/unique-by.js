import Ember from 'ember';

export function excludeDuplicates(iter, attr) {
  const seen = [];
  return iter.filter((i) => {
    const value = i.get(attr);
    if (seen.contains(value)) return false;
    seen.push(value);
    return true;
  });
}

export function uniqueBy(dependentKey, attribute) {
  return Ember.computed.call(this, dependentKey, function() {
    return excludeDuplicates(Ember.get(this, dependentKey), attribute);
  });
}
