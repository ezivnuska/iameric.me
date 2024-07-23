const Order = require('../../models/Order')

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

module.exports = markOrderReceivedByDriver