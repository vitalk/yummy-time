import Ember from 'ember';

export default Ember.Component.extend({
  tabName: 'div',
  classNames: ['b-input-group', 'b-product-quantity'],

  canAdd: false,
  canRemove: false,

  actions: {
    add() {
      this.attrs.add();
    },

    remove() {
      this.attrs.remove();
    }
  }
});
