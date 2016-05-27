'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loaderPlugin = require('../../server/app/models/loader');

const affiliateSchema = new Schema({
  address: { type: String },
  phones: [{ type: String, required: true }]
});

const vendorSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  'min-order-cost': { type: Number },
  affiliates: [affiliateSchema],
  products: [{ ref: 'Product', type: Schema.ObjectId }]
});

vendorSchema.plugin(loaderPlugin);

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

module.exports = mongoose.model('Vendor', vendorSchema);
