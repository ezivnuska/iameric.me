export default (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.user
            break
        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                profileImage: action.profileImage,
            }
            break
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.location,
            }
            break
        case 'UPDATE_IMAGES':
            return {
                ...state,
                images: action.images,
            }
            break
        case 'ADD_IMAGE':
            return {
                ...state,
                images: [
                    ...state.images,
                    action.image,
                ],
            }
            break
        case 'UPDATE_IMAGE':
            if (!state.images) return {
                ...state,
                images: [action.image],
            }
            return {
                ...state,
                images: state.images.map(img => img._id === action.image._id ? action.image : img),
            }
            break
        case 'REMOVE_IMAGE':
            return {
                ...state,
                images: state.images.filter(image => image._id !== action.imageId),
            }
            break
        case 'UPDATE_PRODUCT':
            if (state._id !== action.userId) return state
            if (!state.products) return { ...state, products: [action.product] }
            return state.prooducts.map(p => p._id === action.product._id ? action.product : p)
            break
        case 'UPDATE_PRODUCTS':
            if (!state) return null
            return {
                ...state,
                products: action.products,
            }
            break
        case 'REMOVE_PRODUCT':
            const productIndex = state.products.findIndex(p => p._id === action.productId)
            if (productIndex > -1) {
                return {
                    ...state,
                    products: [
                        ...state.products.slice(0, productIndex),
                        ...state.products.slice(productIndex + 1),
                    ],
                }
            } else return {
                ...state,
                products: [],
            }
            break
        case 'SIGNOUT':
            console.log('signing out...')
            return null
            // state.cart = null
            // state.entries = null
            // state.feature = null
            // state.image = null
            // state.images = null
            // state.loading = null
            // state.location = null
            // state.modal = null
            // state.orders = null
            // state.productData = null
            // state.products = null
            // state.profile = null
            // state.user = null
            // state.users = null
            // state.usersLoaded = false
            // state.vendor = null
            break
        default:
            return state
    }
}