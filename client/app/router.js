import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

// eslint-disable-next-line array-callback-return
Router.map(function() {
  // eslint-disable-next-line prefer-arrow-callback
  this.route('orders', function() {
    this.route('active');
    this.route('inactive');
  });
  this.route('order', { path: '/orders/:order_id' }, function() {
    this.route('index', { path: '/' });
    this.route('checkout');
    this.route('notify');
    this.route('participants');
    this.route('products');
  });
  this.route('new-order', { path: '/orders/new' });
  this.route('register');
  this.route('login');
  this.route('vendors', { path: '/vendors' });
  this.route('new-vendor', { path: '/vendors/new' });
  // eslint-disable-next-line prefer-arrow-callback
  this.route('account', function() {});
});

export default Router;
