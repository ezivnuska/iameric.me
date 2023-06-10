const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    merchantId: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
})

const ItemModel = mongoose.model('Item', ItemSchema)

module.exports = ItemModel
