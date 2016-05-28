import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      portions: this.store.query('portion', {
        filter: { simple: { owner: this.get('session.accountId'), deleted: false } }
      })
    }).then((result) => {
      const ids = result.portions.map((p) => p.get('product.id'));
      return this.store.query('product', {
        filter: { simple: { _id: { $in: ids.uniq() } } }
      }).then((products) => {
        result.products = products; // eslint-disable-line no-param-reassign
        return result;
      });
    }).then((result) => {
      const ids = result.portions.map((p) => p.get('order.id'));
      return this.store.query('order', {
        filter: { simple: { _id: { $in: ids.uniq() } } }
      }).then((orders) => {
        result.orders = orders; // eslint-disable-line no-param-reassign
        return result;
      });
    }).then((result) => {
      const ids = result.orders.map((o) => o.get('vendor.id'));
      return this.store.query('vendor', {
        filter: { simple: { _id: { $in: ids.uniq() } } }
      }).then((vendors) => {
        result.vendors = vendors; // eslint-disable-line no-param-reassign
        return result;
      });
    });
  }
});
