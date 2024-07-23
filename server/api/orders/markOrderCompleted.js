const Order = require('../../models/Order')

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

module.exports = markOrderCompleted