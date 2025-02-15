const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MemorySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    shared: {
        type: Boolean,
        default: false
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
        required: false
    },
    // images: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserImage',
    //     required: false
    //     // default: []
    // }],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},
{
    timestamps: true
})

MemorySchema.pre('save', function(next) {
    this.title = this.title || 'Untitled'
    next()
})

const MemoryModel = mongoose.model('Memory', MemorySchema)

module.exports = MemoryModel
