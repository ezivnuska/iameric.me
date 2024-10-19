// MONGOose models
const Product = require('../../models/Product')

const getAllProducts = async (req, res) => {
    
    const products = await Product.find({})
        .populate('image', 'filename height width')
        .populate('vendor', 'username')
    
    if (products) return res.status(200).json({ products })
    else console.log('Error getting all products')
    return res.status(200).json(null)
}

module.exports = getAllProducts