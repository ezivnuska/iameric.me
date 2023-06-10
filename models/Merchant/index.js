const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MerchantSchema = new Schema({
    title: {
        type: String,
        // required: true,
    },
})

const MerchantModel = mongoose.model('Merchant', MerchantSchema)

module.exports = MerchantModel
