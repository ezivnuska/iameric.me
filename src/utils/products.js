import axios from 'axios'

/**
 * 
 * products 
 *  
 */

export const loadProduct = async productId => {

    const product = await axios.get(`/api/product/${productId}`)
    
    if (!product) {
        console.log('could not load product')
    }

    return product
}

export const loadProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products')
    } else if (!data.products || !data.products.length) {
        console.log('no products to load')
    } else {
        return data.products
    }
    return null
}

export const loadUserProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products')
    } else if (!data.products) {
        console.log('no products to load')
    }

    return data
}

export const deleteProductWithId = async id => {
    
    const { data } = await axios.delete(`/api/products/delete/${id}`)

    if (!data.product) {
        console.log('Error deleting product')
        return null
    }

    return data.product
}