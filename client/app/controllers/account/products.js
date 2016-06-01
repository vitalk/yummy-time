import Ember from 'ember';
import { NavigationTabsMixin } from './index';
import { ProductActionsMixin } from '../order/index';

export default Ember.Controller.extend(NavigationTabsMixin, ProductActionsMixin, {
  myPortions: Ember.computed('portions.[]', 'portions.@each.deleted', function() {
    return this.get('portions').filter((portion) => { // eslint-disable-line arrow-body-style
      return (portion.get('owner.id') === this.get('session.account.id') &&
              !portion.get('deleted'));
    });
  }),
  products: Ember.computed.mapBy('myPortions', 'product'),
  uniqueProducts: Ember.computed.uniqueBy('products', 'id'),
  productsSorting: ['id'],
  myProducts: Ember.computed.sort('uniqueProducts', 'productsSorting'),

  totalCost: Ember.computed('myPortions.[]', function() {
    return this.get('myPortions').reduce((sum, portion) => { // eslint-disable-line arrow-body-style
      return sum + portion.get('cost');
    }, 0);
  }),

  foundNothing: Ember.computed.empty('myPortions'),
  foundAlmostNothing: Ember.computed.lt('myProducts.length', 3)
});
