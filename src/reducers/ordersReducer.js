export default (state, action) => {
    switch(action.type) {
        case 'SET_ORDERS':
            state.orders = action.orders
            break
        case 'ADD_ORDER':
            if (!state.orders) state.orders = [action.order]
            else state.orders = [...state.orders, action.order]
            // cart = null
            break
        case 'CONFIRM_ORDER':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        confirmed: action.order.confirmed,
                    }
                } else return order
            })
        break
        case 'ORDER_READY':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        ready: action.order.ready,
                    }
                } else return order
            })
        break
        case 'ACCEPT_ORDER':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        accepted: action.order.accepted,
                        driver: action.order.driver,
                    }
                } else return order
            })
        break
        case 'DRIVER_ARRIVED':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        arrived: action.order.arrived,
                    }
                } else return order
            })
        break
        case 'ORDER_RECEIVED':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        received: action.order.recieved,
                    }
                } else return order
            })
        break
        case 'COMPLETE_ORDER':
            state.orders = state.orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        delivered: action.order.delivered,
                    }
                } else return order
            })
        break
        case 'CLOSE_ORDER':
            state.orders = state.orders.map(order => {
                if (order._id === action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        closed: action.order.closed,
                    }
                } else return order
            })
        break
        case 'REMOVE_ORDER':
            state.orders = state.orders.filter(order => order._id != action.id)
            if (!state.orders.length) state.orders = null
        break
        default:
            return state
    }
}