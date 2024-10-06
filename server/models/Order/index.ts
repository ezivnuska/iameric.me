const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  }],
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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
  ready: {
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
  closed: {
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

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel