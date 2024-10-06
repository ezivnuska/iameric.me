const Order = require('../../models/Order')

const createOrder = async (req, res) => {
    
    const { customer, items } = req.body
    
    const vendor = items[0].product.vendor
    
    const itemized = items.map(({ product, quantity }) => ({
        customer: customer._id,
        product: product._id,
        vendor: vendor._id,
        quantity,
    }))

    let order = await Order.create({
        customer,
        items: itemized,
        vendor,
    })
    
    order = await Order
        .findOne({ _id: order._id })
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

    if (!order) console.log('Error creating new order')
    else return res.status(200).json({ order })
    return res.json(400).json(null)
}

module.exports = createOrder