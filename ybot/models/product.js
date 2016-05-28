'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loaderPlugin = require('../../server/app/models/loader');

const productSchema = new Schema({
  name: { type: String, required: true },
  rev: { type: Number, required: true, default: 0 },
  text: { type: String },
  cost: { type: Number },
  'image-url': { type: String },
  vendor: { ref: 'Vendor', type: Schema.ObjectId }
});

productSchema.plugin(loaderPlugin);

module.exports = mongoose.model('Product', productSchema);
