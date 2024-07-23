const Order = require('../../models/Order')

const confirmOrder = async (req, res) => {
    const { id, pickup } = req.body
    
    const order = await Order
        .findOneAndUpdate(
            { _id: id },
            { $set: {
                status: 1,
                confirmed: Date.now(),
                pickup,
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

    if (!order) console.log('Could not confirm order')
    else return res.status(200).json({ order })
    return res.status(400).json(null)
}

module.exports = confirmOrder