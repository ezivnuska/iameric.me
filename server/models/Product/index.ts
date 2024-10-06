const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
    },
    blurb: {
        type: Schema.Types.String,
    },
    desc: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
    },
},
{
    timestamps: true,
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel
