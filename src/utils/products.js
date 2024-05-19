import axios from 'axios'

/**
 * 
 * products 
 *  
 */

export const loadProduct = async productId => {
    const product = await axios.get(`/api/product/${productId}`)
    if (!product) console.log('could not load product')
    else return product
    return null
}

export const createProduct = async product => {
    const { data } = await axios.post('/api/product', product)
    if (!data || !data.product) console.log('could not create product')
    else return data.product
    return null
}

export const loadProducts = async vendorId => {
    const { data } = await axios.get(`/api/products/${vendorId}`)
    if (!data || !data.products) console.log('could not load products')
    else return data.products
    return null
}

export const loadVendorProducts = async vendorId => {
    const { data } = await axios.get(`/api/products/${vendorId}`)
    if (!data || !data.products) console.log('could not load products')
    else return data.products
    return null
}

export const deleteProductWithId = async id => {
    const { data } = await axios.delete(`/api/products/delete/${id}`)
    if (!data || data.product) console.log('Error deleting product')
    else return data.product
    return null
}

export const addImageToProduct = async (imageId, productId) => {
    const { data } = await axios.post('/api/product/image', { imageId, productId })
    if (!data || !data.product) console.log('error adding image to product')
    else return data.product
    return null
}