const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BipSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        latitude: {
            type: Schema.Types.String,
        },
        longitude: {
            type: Schema.Types.String,
        },
    },
},
{
    timestamps: true,
})

const BipModel = mongoose.model('Bip', BipSchema)

module.exports = BipModel
