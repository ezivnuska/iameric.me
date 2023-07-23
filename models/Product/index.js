const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
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
},
{
    timestamps: true,
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel
