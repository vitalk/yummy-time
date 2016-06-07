'use strict';

const mongoose = require('mongoose');
const spiders = require('./spiders');
const util = require('./util');
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

    util.uniqueBy(products, 'url').forEach((item) => {
      const product = new Product(item);
      product.vendor = vendor;
      product.rev = vendor.rev;
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
  const jobs = [];
  const connection = connect();

  spiders.forEach((spider) => {
    const job = new Promise((done) => {
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
        .then(done)
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    });

    jobs.push(job);
  });

  Promise.all(jobs)
    .then(() => connection.close())
    .catch((err) => console.log(err)); // eslint-disable-line no-console
}

main();
