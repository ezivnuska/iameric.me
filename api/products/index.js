// MONGOose models
const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const addImageIdToVendorImages = async (imageId, vendorId) => {

    // get current vendor data from id
    const vendor = await User
        .findOne({ _id: vendorId })

    const currentImages = vendor.images || []
    // update vendor (should be moved into try/catch)
    const updatedVendor = await User
        .findOneAndUpdate(
            { _id: vendor._id },
            { $set: {
                images: [...currentImages, imageId],
            } },
            { new: true },
        )
    
    // if update fails
    if (!updatedVendor) {
        console.log('could not update vendor images.')
        return null
    }

    console.log('updated vendor images.', updatedVendor.images)

    return updatedVendor
}

const saveProductImage = async (filename, userId) => {
    
    // create new document
    const image = new UserImage({ user: userId, filename })
    // save it, before continuing
    await image.save()
    console.log('saved product image', image)
    const updatedVendor = await addImageIdToVendorImages(image._id, userId)
    
    return {
        image,
        products: updatedVendor.products,
    }
}

const saveAndReturnNewProductImage = async (filename, vendor) => {
    
    console.log('saving ProductImage:filename', filename)
    const {
        image,
        products, // don't need this here, maybe should delete...
    } = await saveProductImage(filename, vendor)

    console.log('saveAndReturnNewProductImage', image)
    if (!image) {
        console.log(`Could not save ${filename}.`)
        return null
    }

    return image
}

const createOrUpdateProduct = async (req, res) => {

    // pull data from request
    const { _id, price, title, desc, vendor, blurb, category, imageId, filename } = req.body
    console.log('product shit...', req.body)
    // use data to create a starting reference to new product
    let product = {
        price,
        vendor,
        title,
        desc,
        blurb,
        category,
        // imageId: newImageId,
    }

    // if request includes a reference to (already) uploaded file...
    if (filename) {
        console.log('filename detected', filename)
        const newImage = await saveAndReturnNewProductImage(filename, vendor)
        product = {
            ...product,
            imageId: newImage ? newImage._id : imageId,
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
    } else {
        // if product does not exist, create new product
        // don't forget possible new image reference
        console.log('creating new product')
        product = await Product.create({ ...product })
    }
    
    // collect needed data for new product in object
    // const newProduct = { price, title, desc, vendor, blurb, category, imageId }


    // does the request include a reference to an uploaded file?
    // if (filename) {// if it does, then get and save a reference to the images id
    //     console.log('filename detected', filename)
    //     newImage = await saveAndReturnNewProductImage(filename, vendor)
    // }

    // console.log('createOrUpdateProduct:newImage', newImage)

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