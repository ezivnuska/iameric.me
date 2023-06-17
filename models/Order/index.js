const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  bag: {
    type: Schema.Types.Boolean,
    default: false,
  },
  orderId: {
    type: Schema.Types.String,
    required: true,
  },
  headcount: {
    type: Schema.Types.Number,
    required: true,
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
  }],
  pickup: {
    type: Date,
    default: Date.now,
  },
  dropoff: {
    type: Date,
    default: Date.now,
  },
  drivers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  orderState: {
    type: Schema.Types.Number,
    default: 0,
  }
},
{
  timestamps: true,
})

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel