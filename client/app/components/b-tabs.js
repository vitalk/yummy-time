import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  activeClass: '_active',
  tabs: Ember.A()
});
