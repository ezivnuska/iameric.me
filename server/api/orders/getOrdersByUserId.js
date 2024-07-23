const Order = require('../../models/Order')

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

module.exports = getOrdersByUserId