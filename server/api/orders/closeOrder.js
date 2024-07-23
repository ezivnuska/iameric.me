const Order = require('../../models/Order')

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

module.exports = closeOrder