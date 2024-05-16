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
    if (!data) console.log('could not load products')
    else if (!data.products || !data.products.length) console.log('no products to load')
    else return data.products
    return null
}

export const loadVendorProducts = async vendorId => {
    const { data } = await axios.get(`/api/products/${vendorId}`)
    if (!data) console.log('could not load products')
    else if (!data.products) console.log('no products to load')
    return data.products
}

export const deleteProductWithId = async id => {
    
    const { data } = await axios.delete(`/api/products/delete/${id}`)

    if (!data.product) {
        console.log('Error deleting product')
        return null
    }

    return data.product
}

export const addImageToProduct = async (imageId, productId) => {
    const { product } = await axios.post('/api/product/image', { imageId, productId })
    if (!product) console.log('error adding image to product')
    else return product
    return null
}