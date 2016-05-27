'use strict';

const scrapy = require('node-scrapy');
const config = require('../config.json');

class BaseSpider {
  constructor(name) {
    this.name = name || 'dummy';
    this.model = null;

    this._seed = 0;
    this.delayBetweenRequests = 1000;
  }

  /**
   * Delay between requests.
   *
   * @return {Number}
   */
  get requestDelay() {
    return this._seed * this.delayBetweenRequests;
  }

  /**
   * Vendor configuration.
   *
   * @return {Object}
   */
  get config() {
    return config[this.name];
  }

  /**
   * Logs passed arguments into the console. Use spider name as a prefix.
   */
  log() {
    // eslint-disable-next-line prefer-rest-params
    Array.prototype.unshift.call(arguments, `[${this.name}]`);
    // eslint-disable-next-line no-console, prefer-rest-params
    console.log.apply(console, arguments);
  }

  /**
   * Load an URL and try to extract a payload from result.
   *
   * @return {Promise}
   */
  load(url, model) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-param-reassign
      model = model || this.model;
      this._seed += 1;

      setTimeout(() => {
        this.log(`Loading <${url}>`);
        scrapy.scrape(url, model, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      }, this.requestDelay);
    });
  }

  /**
   * Should return a parsed response as a promise.
   *
   * @return {Promise}
   */
  parse() {
    throw new Error('Should be implemented in a subclass');
  }
}

module.exports = BaseSpider;
