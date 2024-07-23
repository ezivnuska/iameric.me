const Order = require('../../models/Order')

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
            select: 'product quantity',
            // select: 'product price title quantity',
            populate: {
                path: 'product',
                popylate: 'vendor',
            },
        })
    
    if (!orders) console.log('Error getting orders')
    else {
        // orders = getSanitizedOrders(orders)
        return res.status(200).json({ orders })
    }
    return res.json(400).json(null)
}

module.exports = getAllOrders