const Order = require('../../models/Order')

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

module.exports = markOrderAsReady