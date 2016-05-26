import Ember from 'ember';
import { NavigationTabsMixin } from './index';

export default Ember.Controller.extend(NavigationTabsMixin, {
  foundNothing: Ember.computed.empty('model')
});
