export default (state, action) => {
    switch(action.type) {
        case 'SET_USERS':
            return state.users = action.users
            break
        case 'SET_USERS_LOADED':
            return state.usersLoaded = action.loaded
            break
        case 'UPDATE_USER':
            state.users = state.users
                ? state.users.map(u => {
                    if (u._id === action.user._id) {
                        return action.user
                    }
                    return u
                })
                : [action.user]
            
            if (action.user._id === state.user._id)
                state.user = action.user            
            break
        case 'UPDATE_USER_IMAGES':
            console.log('updating user images')
            if (action.userId === state.user._id) {
                state.user.images = action.images
                console.log('root user images updated', state.user)
            } else {
                if (state.users) {
                    state.users = state.users.map(u => {
                        if (u._id === action.userId) {
                            console.log('updating user images', action.images)
                            return {
                                ...u,
                                images: action.images,
                            }
                        }
                        return u
                    })
                }
            }
            break
        case 'UPDATE_USER_PRODUCTS':
            state.users = state.users.map(u => {
                if (u._id === action.userId) {
                    return {
                        ...u,
                        products: action.products,
                    }
                }
                return u
            })
            break
        case 'ADD_IMAGE_TO_USER':
            state.users = state.users.map(u => {
                if (!action.image) {
                    console.log('no image reference to add')
                    return
                }
                if (u._id === action.image.user) {
                    return {
                        ...u,
                        images: [...u.images, action.image],
                    }
                }
                return u
            })
            break
        case 'REMOVE_IMAGE_FROM_USER':
            state.users = state.users.map(u => {
                if (!action.image) {
                    console.log('no image reference to remove')
                    return
                }
                if (u._id === action.image.user) {
                    return {
                        ...u,
                        images: u.images.filter(image => image._id !== action.image._id),
                    }
                }
                return u
            })
            break
        case 'REMOVE_PRODUCT_FROM_USER':
            state.users = state.users.map(u => {
                if (!action.product) {
                    console.log('no product reference to remove')
                    return
                }
                if (u._id === action.product.user) {
                    return {
                        ...u,
                        products: u.products.filter(products => products._id !== action.product._id),
                    }
                }
                return u
            })
            break
        case 'ADD_PRODUCT_TO_USER':
            state.users = state.users.map(u => {
                if (!action.product) {
                    console.log('no product reference to remove')
                    return
                }
                if (u._id === action.product.user) {
                    return {
                        ...u,
                        products: [...u.products, action.product],
                    }
                }
                return u
            })
            break
        default:
            return state
    }
}