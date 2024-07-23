const addImageIdToProduct = require('./addImageIdToProduct')
const createOrUpdateProduct = require('./createOrUpdateProduct')
const deleteProductById = require('./deleteProductById')
const getProductById = require('./getProductById')
const getAllProducts = require('./getAllProducts')
const getProductsByVendorId = require('./getProductsByVendorId')

module.exports = {
    addImageIdToProduct,
    createOrUpdateProduct,
    deleteProductById,
    getProductById,
    getAllProducts,
    getProductsByVendorId,
}