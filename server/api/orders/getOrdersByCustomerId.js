const Order = require('../../models/Order')

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

module.exports = getOrdersByCustomerId