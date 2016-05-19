import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  activeClass: 'b-tabs__link_active',
  tabs: Ember.A()
});
