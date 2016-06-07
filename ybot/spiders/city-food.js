'use strict';

const util = require('../util');
const Spider = require('./base');

module.exports = class CityFoodSpider extends Spider {
  constructor(name) {
    super(name || 'city-food');
    this.model = {
      name: {
        selector: '.page-title',
        required: true
      },
      url: {
        selector: '[rel="canonical"]',
        get: 'href',
        required: true
      },
      text: {
        selector: '.field-name-field-text'
      },
      cost: {
        selector: '.sell-price .uc-price',
        required: true,
        transform() { return this.toString().replace(/[^\d]/g, ''); }
      },
      'image-url': {
        selector: '.field-name-uc-product-image img',
        get: 'src'
      }
    };
    this.startUrl = 'http://city-food.by';
  }

  parse() {
    return this.getCategories()
      .then(this.getPages.bind(this))
      .then(this.getProducts.bind(this));
  }

  getCategories() {
    const startUrl = this.startUrl;

    return this.load(startUrl, {
      selector: '#cont ul.menu > li > a',
      prefix: startUrl,
      get: 'href'
    }).then((urls) => { // eslint-disable-line arrow-body-style
      return new Promise((resolve) => {
        resolve(util.normalizeUrls(startUrl, urls));
      });
    });
  }

  getPages(categories) {
    return new Promise((resolve) => {
      Promise.all(categories.map((url) => this.load(url, {
        selector: '.views-row .views-field-title a',
        prefix: this.startUrl,
        get: 'href'
      }))).then((categories) => { // eslint-disable-line no-shadow
        resolve([].concat.apply([], categories));
      });
    });
  }

  getProducts(urls) {
    return Promise.all(urls.map((url) => this.load(url)));
  }
};
