const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  address: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
},
{
  timestamps: true,
})

const LocationModel = mongoose.model('Location', locationSchema)

module.exports = LocationModel