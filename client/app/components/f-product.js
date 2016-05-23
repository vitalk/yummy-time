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
      return this.get('products').filter((product) => {
        return regexp.test(product.get('name'));
      });
    }

    return this.get('products');
  })
});
