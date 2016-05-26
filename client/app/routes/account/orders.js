import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model() {
    return this.store.query('order', {
      filter: { simple: { manager: this.get('session.accountId') } }
    });
  }
});
