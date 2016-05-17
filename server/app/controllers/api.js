'use strict';

const API = require('json-api');
const models = {
  Order: require('../models/order'),
  Account: require('../models/account'),
  Vendor: require('../models/vendor'),
  Product: require('../models/product'),
  Portion: require('../models/portion')
};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry({
  orders: require('./api/resource-descriptions/order'),
  accounts: require('./api/resource-descriptions/account'),
  portions: require('./api/resource-descriptions/portion'),
  products: require('./api/resource-descriptions/product'),
  vendors: require('./api/resource-descriptions/vendor')
}, { dbAdapter: adapter });

const controller = new API.controllers.API(registry);
const api = new API.httpStrategies.Express(controller);

module.exports = api.apiRequest.bind(api);
