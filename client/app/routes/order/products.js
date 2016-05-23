import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    const vendorId = model.order.get('vendor.id');
    this.store.query('product', {
      filter: { simple: { vendor: vendorId } }
    }).then((products) => {
      controller.set('products', products);
    });
  }
});
