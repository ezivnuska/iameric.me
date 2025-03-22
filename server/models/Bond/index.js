const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BondSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  actionerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
{
  timestamps: true
})

const BondModel =  mongoose.model('Bond', BondSchema)

module.exports = BondModel
