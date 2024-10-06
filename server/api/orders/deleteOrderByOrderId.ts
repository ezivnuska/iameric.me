const Order = require('../../models/Order')

const deleteOrderByOrderId = async (req, res) => {
    const { id } = req.params
    const order = await Order.findByIdAndDelete(id)
    if (!order) console.log('could not delete order.')
    else return res.status(200).json({ order })
    return res.status(200).json(null)
}

module.exports = deleteOrderByOrderId