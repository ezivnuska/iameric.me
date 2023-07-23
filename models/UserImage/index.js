const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
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
