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
    caption: {
        type: Schema.Types.String,
        // required: true,
    },
},
{
    timestamps: true,
})

const UserImageModel = mongoose.model('UserImage', UserImageSchema)

module.exports = UserImageModel
