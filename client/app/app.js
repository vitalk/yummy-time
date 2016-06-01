import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { uniqueBy } from './macros/unique-by';

Ember.MODEL_FACTORY_INJECTIONS = true;

function configure() {
  const macros = { uniqueBy };

  for (const name in macros) {
    if (macros.hasOwnProperty(name)) {
      Ember.computed[name] = macros[name];
    }
  }
}

configure();

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
