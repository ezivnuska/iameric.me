export default (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':

            const { quantity } = action
            const productVendor = action.product.vendor

            let currentOrder = null

            if (!state) {
                return [{
                    vendor: productVendor,
                    items: [{
                        product: action.product,
                        quantity,
                    }]
                }]
            } else {
                let cartIndex = 0
                if (state.length > 1)
                    cartIndex = state.findIndex(order => order.vendor._id === productVendor._id)
                
                if (cartIndex >= -1) {
                    currentOrder = {
                        ...state[cartIndex],
                        items: [
                            ...state[cartIndex].items,
                            {
                                product: action.product,
                                quantity,
                            },
                        ],
                    }
                } else {
                    currentOrder = {
                        vendor: productVendor,
                        items: [{
                            product: action.product,
                            quantity,
                        }]
                    }
                }
                
                return [
                    ...state.slice(0, cartIndex),
                    currentOrder,
                    ...state.slice(cartIndex + 1)
                ]
            }
            // state.feature = null
            // state.image = null
            // state.modal = null
            // state.productData = null
            break
        case 'CLEAR_CART':
            state = null
            break
        default:
            return state
    }
}