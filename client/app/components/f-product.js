import Ember from 'ember';
import { ProductActionsMixin } from '../controllers/order/index';

export default Ember.Component.extend(ProductActionsMixin, {
  tagName: 'form',
  classNames: ['f-default', 'f-product'],
  order: null,
  products: null
});
