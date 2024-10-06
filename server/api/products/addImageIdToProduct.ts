// MONGOose models
const Product = require('../../models/Product')

const addImageIdToProduct = async (req, res) => {
    const { productId, imageId } = req.body
    const product = await Product
        .findOneAndUpdate(
            { _id: productId },
            { $set: { image: imageId } },
            { new: true },
        )
        .populate('image')
    
    if (!product) console.log('no updated product')
    else return res.status(200).json({ product })
    return res.status(200).json(null)
}

module.exports = addImageIdToProduct