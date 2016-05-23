import Ember from 'ember';
import { ProductActionsMixin } from '../controllers/order/index';

export default Ember.Component.extend(ProductActionsMixin, {
  tagName: 'form',
  classNames: ['f-default', 'f-product'],
  order: null,
  products: null,

  filter: null,
  filteredProducts: Ember.computed('products.[]', 'filter', function() {
    const filter = this.get('filter');
    const regexp = new RegExp(filter, 'i');

    if (filter) {
      // eslint-disable-next-line arrow-body-style
      return this.get('products').filter((product) => {
        return regexp.test(product.get('name'));
      });
    }

    return this.get('products');
  }),

  anythingSelected: Ember.computed.notEmpty('myPortions'),
  totalCost: Ember.computed('myPortions', function() {
    // eslint-disable-next-line arrow-body-style
    return this.get('myPortions').reduce((sum, portion) => {
      return sum + portion.get('cost');
    }, 0);
  })
});
