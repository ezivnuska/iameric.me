const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    vendorId: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
    price: {
        type: String,
        // required: true,
    },
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel
