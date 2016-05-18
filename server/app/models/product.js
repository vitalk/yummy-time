'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String },
  cost: { type: Number },
  'image-url': { type: String },
  vendor: { ref: 'Vendor', type: Schema.ObjectId }
});

module.exports = mongoose.model('Product', productSchema);
