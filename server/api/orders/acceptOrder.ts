const Order = require('../../models/Order')

const acceptOrder = async (req, res) => {
    
    const { id, driver } = req.body
    
    const order = await Order
        .findOneAndUpdate(
            { _id: id },
            { $set: {
                status: 2,
                driver,
                accepted: Date.now(),
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
        
    if (!order) console.log('Could not accept order')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
}

module.exports = acceptOrder