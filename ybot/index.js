'use strict';

const mongoose = require('mongoose');
const spiders = require('./spiders');
const config = require('../server/config/config');
const Product = require('./models/product');
const Vendor = require('./models/vendor');

function connect(options) {
  return mongoose.connect(config.db, options).connection;
}

function save(res) {
  return new Promise((resolve, reject) => {
    const vendor = res[0];
    const products = res[1];

    vendor.rev += 1;
    const upcoming = vendor.rev;

    products.forEach((item) => {
      const product = new Product(item);
      product.vendor = vendor;
      product.rev = upcoming;
      product.save((err) => {
        if (err) {
          reject(err);
        }

        vendor.products.push(product);
        vendor.save((err) => { // eslint-disable-line no-shadow
          if (err) {
            reject(err);
          }

          resolve();
        });
      });
    });
  });
}

function main() {
  spiders.forEach((spider) => {
    const connection = connect();

    const vendor = new Promise((resolve, reject) => {
      const options = {
        criteria: { title: spider.config.title },
        select: 'title rev products',
        attrs: spider.config
      };

      Vendor.loadOrCreate(options, (err, vendor) => { // eslint-disable-line no-shadow
        if (err) {
          reject(err);
        }
        resolve(vendor);
      });
    });

    Promise.all([vendor, spider.parse()])
      .then(save)
      .then(() => connection.close());
  });
}

main();
