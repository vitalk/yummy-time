import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('order', params.order_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    const vendorId = model.get('vendor.id');
    this.store.query('product', {
      filter: { simple: { vendor: vendorId } }
    }).then((products) => {
      controller.set('products', products);
    });
  }
});
