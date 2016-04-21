'use strict';

const main = require('../app/controllers/main');
const api = require('../app/controllers/api');
const auth = require('../app/controllers/auth');

/**
 * Expose routes
 */

module.exports = function(app) {
  app.get('/', main.index);
  app.post('/auth/token', auth.token);
  app.get('/:type(orders|accounts)', api);
  app.get('/:type(orders|accounts)/:id', api);
  app.post('/:type(orders|accounts)', api);
}
