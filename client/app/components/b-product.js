import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['b-product'],
  session: Ember.inject.service(),

  actions: {
    add() {
      this.attrs.add(
        this.get('session.account'),
        this.get('product')
      )
    }
  }
});
