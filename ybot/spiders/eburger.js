'use strict';

const util = require('../util');
const Spider = require('./base');

module.exports = class EburgerSpider extends Spider {
  constructor(name) {
    super(name || 'eburger');
    this.model = {
      name: {
        selector: '[itemtype="http://schema.org/Product"] [itemprop="name"]',
        required: true
      },
      url: {
        selector: '[rel="canonical"]',
        get: 'href',
        required: true
      },
      text: {
        selector: '[itemtype="http://schema.org/Product"] [itemprop="description"]'
      },
      cost: {
        selector: '[itemtype="http://schema.org/Product"] [itemprop="price"]',
        get: 'content',
        required: true
      },
      'image-url': {
        selector: '[itemtype="http://schema.org/Product"] [itemprop="image"]',
        get: 'href'
      }
    };
    this.startUrl = 'http://eburger.by/menu';
  }

  parse() {
    return this.getProductsUrls()
      .then(this.getProducts.bind(this));
  }

  getProductsUrls() {
    const startUrl = this.startUrl;

    return this.load(startUrl, {
      selector: '.product a',
      get: 'href'
    }).then((urls) => { // eslint-disable-line arrow-body-style
      return new Promise((resolve) => {
        resolve(util.normalizeUrls(startUrl, urls));
      });
    });
  }

  getProducts(urls) {
    return Promise.all(urls.map((url) => this.load(url)));
  }
};
