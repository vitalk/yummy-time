import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['checkbox'],
  classNameBindings: ['checked:checkbox_checked', 'disabled:checkbox_disabled']
});
