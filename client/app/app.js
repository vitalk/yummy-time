import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { unique } from './helpers/unique';

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.computed.unique = function(dependentKey, attribute) {
  return Ember.computed.call(this, dependentKey, function() {
    return unique(Ember.get(this, dependentKey), attribute);
  });
}

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
