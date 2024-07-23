const Order = require('../../models/Order')

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

module.exports = markDriverAtVendorLocation