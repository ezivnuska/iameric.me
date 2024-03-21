export default (state, action) => {
    console.log('**', action)
    switch(action.type) {
        case 'SET_USERS':
            return action.users
            break
        case 'UPDATE_USER':
            if (!state)
                return [action.user]

            return state.map(user => {
                if (user._id === action.user._id) {
                    return action.user
                }
                return user
            })
            break
        case 'UPDATE_USER_IMAGES':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.userId) {
                    return {
                        ...user,
                        images: action.images,
                    }
                }
                return user
            })
            break
        case 'UPDATE_USER_PRODUCTS':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.userId) {
                    return {
                        ...user,
                        products: action.products,
                    }
                }
                return user
            })
            break
        case 'UPDATE_USER_IMAGES':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.userId) {
                    return {
                        ...user,
                        images: action.images,
                    }
                }
                return user
            })
            break
        case 'ADD_USER_IMAGE':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.image.user) {
                    return {
                        ...user,
                        images: [...user.images, action.image],
                    }
                }
                return user
            })
            break
        case 'UPDATE_USER_IMAGE':
            const image = action.image
            const userId = image.user
            
            if (!state) return [{ _id: userId, images: [action.image] }]
            
            return state.map(user => {
                if (user._id === userId) {

                    if (!user.images) return {
                        ...state,
                        images: [action.image],
                    }

                    return {
                        ...user,
                        images: user.images.map(img => img._id === userId ? action.image : img),
                    }
                }
                return user
            })
            break
        case 'REMOVE_USER_IMAGE':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.image.user) {
                    return {
                        ...user,
                        images: user.images.filter(image => image._id !== action.image._id),
                    }
                }
                return user
            })
            break
        case 'REMOVE_PRODUCT_FROM_SINGLE_USER':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.product.user) {
                    return {
                        ...user,
                        products: user.products.filter(products => products._id !== action.product._id),
                    }
                }
                return user
            })
            break
        case 'ADD_PRODUCT_TO_SINGLE_USER':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.product.user) {
                    return {
                        ...user,
                        products: [...user.products, action.product],
                    }
                }
                return user
            })
            break
        case 'UPDATE_USER_PRODUCT':
            
            if (!state) {
                return [{
                    _id: action.userId,
                    products: [action.product]
                }]
            }

            return state.map(user => {
                if (user._id === action.userId) {
                    return {
                        ...user,
                        products: user.products.map(p => p._id === action.product._id ? action.product : p),
                    }
                }
                return user
            })
            break
        case 'UPDATE_USERS_LOCATION':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.userId) {
                    return {
                        ...user,
                        location: action.location,
                    }
                }
                return user
            })
            break
        case 'UPDATE_USERS_LOCATION_WITH_LOCATION_ID':
            if (!state) return null
            return state.map(user => {
                if (user._id === action.location.userId) {
                    return {
                        ...user,
                        location: action.location,
                    }
                }
                return user
            })
            break
        default:
            return state
    }
}