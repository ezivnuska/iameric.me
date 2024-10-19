const Order = require('../../models/Order')

const getOrdersByVendorId = async (req, res) => {
    
    const { id } = req.params

    let orders = await Order
        .find({ vendor: id })
        .populate({
            path: 'customer',
            select: 'username address',
            populate: { path: 'address' },
        })
        .populate({
            path: 'vendor',
            select: 'username address',
            populate: { path: 'address' },
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

module.exports = getOrdersByVendorId