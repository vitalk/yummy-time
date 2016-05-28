'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loaderPlugin = require('./loader');

const affiliateSchema = new Schema({
  address: { type: String },
  phones: [{ type: String, required: true }]
});

const vendorSchema = new Schema({
  title: { type: String, required: true },
  rev: { type: Number, required: true, default: 0 },
  url: { type: String, required: true },
  'min-order-cost': { type: Number },
  affiliates: [affiliateSchema],
  products: [{ ref: 'Product', type: Schema.ObjectId }]
});

vendorSchema.path('title').validate(function(title, callback) {
  const Vendor = mongoose.model('Vendor');

  if (this.isNew || this.isModified('title')) {
    Vendor.find({ title }).exec((err, vendors) =>
      callback(!err && vendors.length === 0)
    );
  } else {
    callback(true);
  }
}, 'Food vendor already exists');

vendorSchema.plugin(loaderPlugin);

module.exports = mongoose.model('Vendor', vendorSchema);
