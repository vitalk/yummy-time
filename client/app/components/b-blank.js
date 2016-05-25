import Ember from 'ember';

export const BlankMixin = Ember.Mixin.create({
  tagName: 'div',
  classNames: ['b-blank']
});

export default Ember.Component.extend(BlankMixin, {});
