import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['b-product'],
  session: Ember.inject.service(),

  portions: Ember.A(),

  accountPortions: Ember.computed.filter('portions', function(portion) {
    return portion.get('owner.id') === this.get('session.account.id');
  }),

  accountProducts: Ember.computed.mapBy('accountPortions', 'product'),

  inOrder: Ember.computed.filter('accountProducts', function() {
    // eslint-disable-next-line arrow-body-style
    return Ember.isPresent(this.get('accountProducts').filter((item) => {
      return item.get('id') === this.get('product').get('id');
    }));
  }),

  actions: {
    add() {
      this.attrs.add();
    },

    remove() {
      this.attrs.remove();
    }
  }
});
