
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var toDoItemSchema = Schema( {
  item: String,
  sku: String,
  cost: Number,
  size: String,
  createdAt: Date,
  userId: ObjectId
} );

module.exports = mongoose.model( 'ToDoItem', toDoItemSchema );
