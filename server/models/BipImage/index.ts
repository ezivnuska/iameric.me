const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BipImageSchema = new Schema({
    bipId: {
        type: Schema.Types.ObjectId,
        ref: 'Bip',
        required: true,
    },
    path: {
        type: Schema.Types.String,
        required: true,
    },
    filename: {
        type: Schema.Types.String,
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
    caption: {
        type: Schema.Types.String,
        // required: true,
    },
    height: {
        type: Schema.Types.Number,
        required: true,
    },
    width: {
        type: Schema.Types.Number,
        required: true,
    },
},
{
    timestamps: true,
})

const BipImageModel = mongoose.model('BipImage', BipImageSchema)

module.exports = BipImageModel
