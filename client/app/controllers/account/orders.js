import Ember from 'ember';
import { NavigationTabsMixin } from './index';
import { SortableMixin } from '../orders/index';

export default Ember.Controller.extend(NavigationTabsMixin, SortableMixin, {
  foundNothing: Ember.computed.empty('model')
});
