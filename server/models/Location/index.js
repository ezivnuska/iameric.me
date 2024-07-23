const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LocationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  address1: {
    type: Schema.Types.String,
    required: true,
  },
  address2: {
    type: Schema.Types.String,
    required: false,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  state: {
    type: Schema.Types.String,
    required: true,
  },
  zip: {
    type: Schema.Types.String,
    required: true,
  },
},
{
  timestamps: true,
})

const LocationModel = mongoose.model('Location', LocationSchema)

module.exports = LocationModel