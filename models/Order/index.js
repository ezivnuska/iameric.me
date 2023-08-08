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
  pickup: {
    type: Date,
    default: Date.now,
  },
  dropoff: {
    type: Date,
    default: Date.now,
  },
  driver: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
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