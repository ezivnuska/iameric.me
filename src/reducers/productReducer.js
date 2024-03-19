export default (state, action) => {
    switch(action.type) {
        case 'REMOVE_PRODUCT_IMAGE':
            state.products = state.products.map(product => {
                if (product.image && product.image._id === action.imageId) return { ...prod, image: null }
                else return product
            })
            break
        case 'SET_PRODUCTS':
            state.products = action.products
            break
        case 'ADD_PRODUCT':
            state.user.products = [
                ...state.user.products,
                action.product,
            ]
            state.productData = null
            break
        case 'UPDATE_PRODUCT':
            if (!state.products) state.products = [action.product]
            else {
                const i = state.products.findIndex(product => product._id === action.product._id)
                if (i <= -1) return state
                state.products = [
                    ...state.products.slice(0, i),
                    action.product,
                    ...state.products.slice(i + 1),
                ]
            }
            state.productData = null
            state.modal = null
            break
        case 'UPDATE_PRODUCT_IMAGE':
            state.products = state.products.map(product => {
                if (product._id === action.productId) {
                    return {
                        ...product,
                        image: action.image,
                    }
                } else return product
            })
            break
        case 'DELETE_PRODUCT':
            state.products = state.products.filter(product => product._id !== action.id)
            break
        default:
            return state
    }
}