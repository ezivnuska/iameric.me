const Order = require('../../models/Order')

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

module.exports = getOrdersByDriverId