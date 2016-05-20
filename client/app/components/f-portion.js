import Ember from 'ember';
import { ProductActionsMixin } from '../controllers/order/index';

export default Ember.Component.extend(ProductActionsMixin, {
  order: null,
  products: null
});
