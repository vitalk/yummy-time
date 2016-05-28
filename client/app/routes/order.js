import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return Ember.RSVP.hash({
      order: this.store.findRecord('order', params.order_id),
      portions: this.store.query('portion', {
        filter: { simple: { order: params.order_id, deleted: false } }
      })
    }).then((result) => { // eslint-disable-line arrow-body-style
      return this.store.query('vendor', {
        filter: { simple: { vendor: result.order.vendor.id } }
      }).then((vendor) => {
        result.vendor = vendor; // eslint-disable-line no-param-reassign
        return result;
      });
    }).then((result) => {
      const ids = result.portions.map((p) => p.get('product.id'));
      return this.store.query('product', {
        filter: { simple: { _id: { $in: ids.uniq() } } }
      }).then((products) => {
        // eslint-disable-next-line no-param-reassign
        result.products = products;
        return result;
        // eslint-disable-next-line no-shadow
      }).then((result) => {
        // eslint-disable-next-line no-shadow
        const ids = result.portions.map((p) => p.get('owner.id'));
        return this.store.query('account', {
          filter: { simple: { _id: { $in: ids.uniq() } } }
        }).then((participants) => {
          // eslint-disable-next-line no-param-reassign
          result.participants = participants;
          return result;
        });
      });
    });
  }
});
