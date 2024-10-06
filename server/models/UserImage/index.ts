const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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

const UserImageModel = mongoose.model('UserImage', UserImageSchema)

module.exports = UserImageModel
