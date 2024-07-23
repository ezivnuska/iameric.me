// MONGOose models
const Product = require('../../models/Product')
const UserImage = require('../../models/UserImage')
const { uploadProductImage } = require('../images')

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

const getAllProducts = async (req, res) => {
    
    const products = await Product
        .find({})
        .populate('image', 'filename height width')
        .populate('vendor', 'username')
    
    if (products) return res.status(200).json({ products })
    else console.log('Error getting all products')
    return res.status(200).json(null)
}

const getProductsByVendorId = async (req, res) => {
    
    const products = await Product
        .find({ vendor: req.params.vendor })
        .populate('image', 'filename height width')
        .populate('vendor', 'username')
    
    if (!products) {
        console.log('Error getting products')
        return res.status(400).json(null)
    }

    // TODO: fix this...
    return res.status(200).json({ products })
}

const getProductById = async (req, res) => {
    
    const product = await Product
        .findOne({ _id: req.params.id })
        .populate('vendor', 'username')
        .populate('image', 'filename width height')
    
    if (!product) {
        console.log('Error getting product.')
        return res.status(200).json(null)
    }

    // TODO: fix this...
    return res.status(200).json(product)
}

const deleteProductById = async (req, res) => {
    const product = await Product
        .findByIdAndDelete(req.params.id)

    if (!product) {
        console.log('could not delete product.')
        return res.status(200).json(null)
    }

    // TODO: fix this...
    return res.status(200).json({ product })
}

// only allow access to these methods
module.exports = {
    addImageIdToProduct,
    createOrUpdateProduct,
    deleteProductById,
    getProductById,
    getAllProducts,
    getProductsByVendorId,
}