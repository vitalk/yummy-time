import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    const vendor = model.order.get('vendor.id');
    const rev = model.order.get('vendor.rev');
    this.store.query('product', {
      filter: { simple: { vendor, rev } }
    }).then((products) => {
      controller.set('products', products);
    });
  }
});
