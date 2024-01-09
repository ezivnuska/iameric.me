const Order = require('../../models/Order')

const getSanitizedOrders = orders => {
    return orders.map(({
        _id, customer, date, driver, items, status, vendor, confirmed, accepted, pickup, arrived, received, delivered, closed, ready,
    }) => ({
        _id,
        customer,
        date,
        driver,
        items,
        status,
        vendor,
        confirmed,
        accepted,
        pickup,
        arrived,
        received,
        delivered,
        closed,
        ready,
    }))
}

// const getOrderIdsByUserId = async (req, res) => {
//     const { id } = req.params
    
//     let orders = await Order
//         .find({
//             $or: [
//                 { customer: id },
//                 { driver: id },
//                 { vendor: id }
//             ]
//         })
    
//     if (!orders) {
//         console.log('no orders to be found.')
//         return res.status(200).json(null)
//     }

//     const orderIds = orders.map(order => order._id)

//     return res.status(200).json({orderIds})
// }

const getOrdersByUserId = async (req, res) => {
    
    const { id } = req.params
    
    const orders = await Order
        .find({
            $or: [
                { customer: id },
                { driver: id },
                { vendor: id }
            ],
        })
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
    
    if (!orders) {
        console.log('Error getting orders by id')
        return res.json(400).json(null)
    }

    // console.log('unsanitized orders', response)
    const sanitizedOrders = getSanitizedOrders(orders)
    // console.log('sanitized orders', sanitizedOrders)

    return res.status(200).json({ orders: sanitizedOrders })
}

const getAllOrders = async (req, res) => {
    
    let orders = await Order
        .find({})
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
    
    if (!orders) {
        console.log('Error getting orders')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
}

const getOrdersByCustomerId = async (req, res) => {
    const { id } = req.params
    
    let orders = await Order
        .find({ customer: id })
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')

    if (!orders) {
        console.log('Error getting customer orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
}

const getOrdersByDriverId = async (req, res) => {
    
    let orders = await Order
        .find({
            $or: [
                { driver: req.params.id },
                { status: { $eq: 1 } },
            ],
        })
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')

    if (!orders) {
        console.log('Error getting driver orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
}

const getOrdersByVendorId = async (req, res) => {
    
    let orders = await Order
        .find({ vendor: req.params.id })
        .populate('items', 'price title')
        .populate('driver', 'username')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })

    if (!orders) {
        console.log('Error getting vendor orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
}

const createOrder = async (req, res) => {
    
    const { customer, items, vendor } = req.body

    let order = await Order.create({
        customer,
        items,
        vendor,
    })
        
    order = await Order
        .findOne({ _id: order._id })
        .populate('items', 'title price')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })

    if (!order) {
        console.log('Error creating new order')
        return res.json(400).json(null)
    }
    
    // console.log(`new order created by ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
}

const confirmOrder = async (req, res) => {
    const { id, pickup } = req.body
    
    const order = await Order
        .findOneAndUpdate(
            { _id: id },
            { $set: {
                status: 1,
                confirmed: Date.now(),
                pickup,
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')

    if (!order) {
        console.log('Could not confirm order')
        return res.status(400).json(null)
    }

    // console.log(`${order.vendor.username} confirmed order for ${order.customer.username}`)

    return res.status(200).json(order)
}

const acceptOrder = async (req, res) => {
    
    const { id, driver } = req.body
    
    const order = await Order
        .findOneAndUpdate(
            { _id: id },
            { $set: {
                status: 2,
                driver,
                accepted: Date.now(),
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
        
    if (!order) {
        console.log('Could not accept order')
        return res.status(200).json(null)
    }

    // console.log(`${order.driver.username} accepted order for ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
}

const markOrderAsReady = async (req, res) => {
    
    const order = await Order
        .findOneAndUpdate(
            { _id: req.body.id },
            { $set: {
                ready: Date.now(),
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
        
    if (!order) {
        console.log('Could not mark order ready')
        return res.status(200).json(null)
    }

    // console.log(`${order.vendor.username} marked order for ${order.customer.username} as ready`)

    return res.status(200).json(order)
}

const markDriverAtVendorLocation = async (req, res) => {
    
    const order = await Order.
        findOneAndUpdate(
            { _id: req.body.id },
            { $set: {
                status: 3,
                arrived: Date.now(),
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')

    if (!order) {
        console.log('Could not update driver status')
        return res.status(400).json(null)
    }

    // console.log(`${order.driver.username} arrived at ${order.vendor.username}`)

    return res.status(200).json(order)
}

const markOrderReceivedByDriver = async (req, res) => {
    
    const order = await Order
        .findOneAndUpdate(
            { _id: req.body.id },
            { $set: {
                status: 4,
                received: Date.now(),
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
        
    if (!order) {
        console.log('Could not save order status as picked up')
        return res.status(200).json(null)
    }
    
    // console.log(`${order.driver.username} picked up order for ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
}

const markOrderComplete = async (req, res) => {
    
    const order = await Order
        .findOneAndUpdate(
            { _id: req.body.id },
            { $set: {
                status: 5,
                delivered: Date.now(),
            } },
            { new: true },
        )
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })
        .populate('driver', 'username')
        
    if (!order) {
        console.log('Could not complete order')
        return res.status(406).json({ err: 'Error completing order'})
    }

    // console.log(`${order.driver.username} completed order from ${order.vendor.username} to ${order.customer.username}`)

    return res.status(200).json(order)
}

const closeOrder = async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 6,
            closed: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) {
        console.log('Could not close order')
        return res.status(406).json({ err: 'Error closing order'})
    }
    // console.log(`Closed order (${order._id}) from ${order.vendor.username}`)

    return res.status(200).json(order)
}

const deleteOrderByOrderId = async (req, res) => {
    
    const { id } = req.params
    
    const order = await Order.findByIdAndDelete(id)

    if (!order) {
        console.log('could not delete order.')
        return res.status(200).json(null)
    }
    
    return res.status(200).json({ order })
}

module.exports = {
    acceptOrder,
    closeOrder,
    confirmOrder,
    createOrder,
    deleteOrderByOrderId,
    getAllOrders,
    // getOrderIdsByUserId,
    getOrdersByCustomerId,
    getOrdersByDriverId,
    getOrdersByUserId,
    getOrdersByVendorId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderComplete,
    markOrderReceivedByDriver,
}