import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      order: this.store.findRecord('order', params.order_id),
      portions: this.store.query('portion', {
        filter: { simple: { order: params.order_id, deleted: false } }
      })
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
