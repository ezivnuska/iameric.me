const Order = require('../../models/Order')
const User = require('../../models/User')

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

const getFilteredOrders = async filter => {
    const orders = await Order
        .find(filter)
        .populate({
            path: 'items',
            select: 'product',
            populate: { path: 'product' },
        })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        // .populate({
        //     path: 'items',
        //     populate: [
        //         {
        //             path: 'image',
        //             select: 'filename',
        //         },
        //         {
        //             path: 'vendor',
        //             select: 'username',
        //         },
        //     ],
        // })
    
    return orders
}

const getRelevantOrdersByUserId = async (req, res) => {

    const { id } = req.params

    const user = await User.findOne({ _id: id })

    const { role } = user

    let orders = null

    if (role === 'customer') {
        orders = await getFilteredOrders({
            $and: [
                { customer: id },
                // { status: { $lt: 7 } },
            ],
        })

    } else if (role === 'vendor') {
        orders = await getFilteredOrders({
            $or: [
                { $and: [
                    { vendor: id },
                    { status: { $lt: 6 } },    
                ]},
                { status: { $lt: 6 } },
            ],
        })

    } else if (role === 'driver') {
        orders = await getFilteredOrders({
            $or: [
                { $and: [
                    { driver: id },
                    { status: { $lt: 6 } },
                ]},
                { status: { $lt: 2 } },
            ],
        })

    } else if (role === 'admin') {
        orders = await getFilteredOrders({ status: { $lt: 7 } },)
    }
    
    if (!orders) {
        console.log('Error getting relevant orders by id')
        return res.json(200).json(null)
    }

    const sanitizedOrders = getSanitizedOrders(orders)
    
    return res.status(200).json({ orders: sanitizedOrders })
}

const getOrdersByUserId = async (req, res) => {
    
    const { id } = req.params
    
    const orders = await Order
        .find({
            $or: [
                { customer: id },
                { driver: id },
                { vendor: id },
            ],
        })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })
    
    if (!orders) {
        console.log('Error getting orders by id')
        return res.json(200).json(null)
    }

    const sanitizedOrders = getSanitizedOrders(orders)

    return res.status(200).json({ orders: sanitizedOrders })
}

const getAllOrders = async (req, res) => {
    
    let orders = await Order
        .find({})
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })
    
    if (!orders) console.log('Error getting orders')
    else {
        orders = getSanitizedOrders(orders)
        return res.status(200).json({ orders })
    }
    return res.json(400).json(null)
}

const getOrdersByCustomerId = async (req, res) => {
    const { id } = req.params
    
    let orders = await Order
        .find({ customer: id })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })

    if (!orders) console.log('Error getting customer orders by id')
    else {
        orders = getSanitizedOrders(orders)
        return res.status(200).json({ orders })
    }
    return res.json(400).json(null)
}

const getOrdersByDriverId = async (req, res) => {
    
    const { id } = req.params

    let orders = await Order
        .find({
            $or: [
                { driver: id },
                { status: { $eq: 1 } },
            ],
        })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })

    if (!orders) console.log('Error getting driver orders by id')
    else {
        orders = getSanitizedOrders(orders)
        return res.status(200).json({ orders })
    }
    return res.json(400).json(null)


}

const getOrdersByVendorId = async (req, res) => {
    
    const { id } = req.params

    let orders = await Order
        .find({ vendor: id })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })

    if (!orders) console.log('Error getting vendor orders by id')
    else {
        orders = getSanitizedOrders(orders)
        return res.status(200).json({ orders })
    }
    
    return res.json(400).json(null)
}

const createOrder = async (req, res) => {
    
    const { customer, items } = req.body
    
    const vendor = items[0].product.vendor
    
    const itemized = items.map(({ product, quantity }) => ({
        customer: customer._id,
        product: product._id,
        vendor: vendor._id,
        quantity,
    }))

    let order = await Order.create({
        customer,
        items: itemized,
        vendor,
    })
    
    order = await Order
        .findOne({ _id: order._id })
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'product price title',
            populate: { path: 'product' },
        })

    if (!order) console.log('Error creating new order')
    else return res.status(200).json({ order })
    return res.json(400).json(null)
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
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })

    if (!order) console.log('Could not confirm order')
    else return res.status(200).json({ order })
    return res.status(400).json(null)
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
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })
        
    if (!order) console.log('Could not accept order')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
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
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })
    
    if (!order) console.log('Could not mark order ready')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
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
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })

    if (!order) console.log('Could not update driver status')
    else return res.status(200).json({ order })
    return res.status(400).json(null)
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
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })
        
    if (!order) console.log('Could not save order status as picked up')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
}

const markOrderCompleted = async (req, res) => {
    
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
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            select: 'image price title vendor',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })
        
    if (!order) console.log('Could not complete order')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
}

const closeOrder = async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 6,
            closed: Date.now(),
        } }, { new: true })
        .populate('items', 'price title')
        .populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' },
        })
        .populate('driver', 'username')
        .populate({
            path: 'items',
            populate: [
                {
                    path: 'image',
                    select: 'filename',
                },
                {
                    path: 'vendor',
                    select: 'username',
                },
            ],
        })
        
    if (!order) console.log('Could not close order')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
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
    getRelevantOrdersByUserId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderCompleted,
    markOrderReceivedByDriver,
}