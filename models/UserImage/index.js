const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserImageSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        // required: true,
    },
})

module.exports = mongoose.model('UserImage', UserImageSchema)
