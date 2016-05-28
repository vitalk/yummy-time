import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('order', {
      filter: { simple: { active: true, deleted: false } }
    });
  },

  renderTemplate(controller, model) {
    this.render('orders.index', { model });
  }
});
