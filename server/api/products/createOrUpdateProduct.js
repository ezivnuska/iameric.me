// MONGOose models
const Product = require('../../models/Product')
const uploadProductImage = require('../upload/uploadProductImage')

const createOrUpdateProduct = async (req, res) => {

    // pull data from request
    const { _id, price, title, desc, vendor, blurb, category, image, attachment } = req.body
    
    // use data to create a starting reference to new product
    let product = {
        price,
        vendor,
        title,
        desc,
        blurb,
        category,
        image,
    }

    // if request includes a reference to (already) uploaded file...
    if (attachment) {
        const response = await uploadProductImage(attachment)
        console.log('image uploaded successfuly. adding to product doc.')
        product = {
            ...product,
            image: response.image,
        }
        
    }
    
    // if product already exists, update existing product
    if (_id) {
        // find and update existing document
        product = await Product
            .findOneAndUpdate(
                { _id },
                { $set: { ...product } },
                { new: true },
            )

        console.log('updated existing product:', product.title)
    } else {
        // if product does not exist, create new product
        // don't forget possible new image reference
        product = await Product.create({ ...product })
        console.log('created new product:', product.title)
    }

    // if product creation failed
    if (!product) {
        console.log(`Error ${_id ? 'updating' : 'adding'} item`)
        // we can do better than returning null...
        return res.status(406).json(null)
    }

    await product
        .populate({
            path: 'image',
            select: 'filename height width user',
            populate: { path: 'user', select: 'username' },
        })

    // return new product data (maybe better to return within an object?)
    return res.status(200).json({ product })
}

module.exports = createOrUpdateProduct