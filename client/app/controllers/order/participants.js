import Ember from 'ember';
import { groupBy } from '../../helpers/group-by';
import { NavigationTabsMixin, ProductActionsMixin } from './index';

export default Ember.Controller.extend(NavigationTabsMixin, ProductActionsMixin, {
  portions: Ember.computed.filterBy('order.portions', 'deleted', false),
  groupedPortions: Ember.computed('portions.[]', function() {
    return groupBy(this.get('portions'), 'owner.id');
  }),

  foundNothing: Ember.computed.empty('groupedPortions')
});
