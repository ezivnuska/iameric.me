// MONGOose models
const Product = require('../../models/Product')

const getProductById = async (req, res) => {
    
    const product = await Product.findOne({ _id: req.params.id })
        .populate('vendor', 'username')
        .populate('image', 'filename width height')
    
    if (!product) console.log('Error getting product.')
    else return res.status(200).json(product)
    return res.status(200).json(null)
}

module.exports = getProductById