// MONGOose models
const Product = require('../../models/Product')

const getProductsByVendorId = async (req, res) => {
    const { vendor } = req.params
    const products = await Product.find({ vendor })
        .populate('image', 'filename height width')
        .populate('vendor', 'username')
    
    if (!products) console.log('Error getting products')
    else return res.status(200).json({ products })
    return res.status(400).json(null)
}

module.exports = getProductsByVendorId