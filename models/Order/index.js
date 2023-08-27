const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // locations: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Location',
  // }],
  confirmed: {
    type: Date,
    default: null,
  },
  pickup: {
    type: Date,
    default: null,
  },
  accepted: {
    type: Date,
    default: null,
  },
  arrived: {
    type: Date,
    default: null,
  },
  received: {
    type: Date,
    default: null,
  },
  delivered: {
    type: Date,
    default: null,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Schema.Types.Number,
    default: 0,
  },
},
{
  timestamps: true,
})

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel