'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var soldItemsSchema = Schema( {
  item: String,
  sku: String,
  soldprice: Number,
  size: String,
  cost: Number,
  totalProfit: Number,
  createdAt: Date,
  userId: ObjectId
} );

module.exports = mongoose.model( 'SoldItems', soldItemsSchema );
