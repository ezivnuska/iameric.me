// MONGOose models
const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const addImageIdToVendorImages = async (imageId, vendorId) => {

    // get current vendor data from id
    const vendor = await User
        .findOne({ _id: vendorId })

    // update vendor (should be moved into try/catch)
    const updatedVendor = await User
        .findOneAndUpdate(
            { _id: vendor._id },
            { $set: {
                images: [...vendor.images, imageId],
            } },
            { new: true },
        )
    
    // if update fails
    if (!updatedVendor) {
        console.log('could not update vendor images.')
        return null
    }

    return updatedVendor
}

const saveProductImage = async (filename, userId) => {
    
    // create new document
    const image = new UserImage({ user: userId, filename })
    // save it, before continuing
    await image.save()

    const updatedVendor = await addImageIdToVendorImages(image._id, userId)
    
    return {
        image,
        user: updatedVendor, // possibly unnecessary.
    }
}

const getSavedProductImage = async (filename, vendor) => {
    
    const {
        image,
        // user, // don't need this here, maybe should delete...
    } = await saveProductImage(filename, vendor)

    if (!image) {
        console.log(`Could not save ${filename}.`)
        return null
    }

    return image
}

const updateAndGetExistingProduct = async ({ _id, ...newData }) => {
    
    // find and update existing document
    const updatedProduct = await Product
        .findOneAndUpdate(
            { _id },
            { $set: newData },
            { new: true },
        )
    
    // then return it
    return updatedProduct
}

const createOrUpdateProduct = async (req, res) => {

    // pull data from request body
    const { _id, price, title, desc, vendor, blurb, category, filename } = req.body
    
    // collect needed data for new product in object
    const newProduct = { price, title, desc, vendor, blurb, category, filename }

    // reference to possible uploaded file attachment
    let newImage = null

    // does the request include a reference to an uploaded file?
    if (filename) // if it does, then get and save a reference to the images id
        newImage = await getSavedProductImage(filename, vendor)

    console.log('newImage', newImage)

    // create a reference to new product
    let product = null

    if (_id) {
        // if product already exists, update existing product
        product = await updateAndGetExistingProduct({
            _id,
            price,
            vendor,
            title,
            desc,
            blurb,
            category,
            imageId: newImage ? newImage._id : null,
        })
    } else {
        // if product does not exist, create new product
        // don't forget possible new image reference
        console.log('creating new product')
        product = await Product.create({
            ...newProduct,
            imageId: newImage ? newImage._id : null,
        })
    }

    // if product creation failed
    if (!product) {
        console.log(`Error ${_id ? 'updating' : 'adding'} item`)
        // we can do better than returning null...
        return res.status(406).json(null)
    }

    // return new product data (maybe better to return within an object?)
    return res.status(200).json(product)
}

const getProductsByVendorId = async (req, res) => {
    
    const products = await Product
        .find({ vendor: req.params.vendor })
        .populate('vendor')
    
    if (!products) {
        console.log('Error getting products')
        return res.status(400).json(null)
    }

    // TODO: fix this...
    return res.status(200).json({ items: products })
}

const deleteProductById = async (req, res) => {
    const product = await Product
        .findByIdAndDelete(req.body.id)

    if (!product) {
        console.log('could not delete product.')
        return res.status(200).json(null)
    }

    // TODO: fix this...
    return res.status(200).json({ item: product })
}

// only allow access to these methods
module.exports = {
    createOrUpdateProduct,
    deleteProductById,
    getProductsByVendorId,
}