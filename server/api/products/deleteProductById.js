// MONGOose models
const Product = require('../../models/Product')

const deleteProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) console.log('could not delete product.')
    else return res.status(200).json({ product })
    return res.status(200).json(null)
}

module.exports = deleteProductById