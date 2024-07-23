const acceptOrder = require('./acceptOrder')
const closeOrder = require('./closeOrder')
const confirmOrder = require('./confirmOrder')
const createOrder = require('./createOrder')
const deleteOrderByOrderId = require('./deleteOrderByOrderId')
const getAllOrders = require('./getAllOrders')
const getOrdersByCustomerId = require('./getOrdersByCustomerId')
const getOrdersByDriverId = require('./getOrdersByDriverId')
const getOrdersByUserId = require('./getOrdersByUserId')
const getOrdersByVendorId = require('./getOrdersByVendorId')
const markDriverAtVendorLocation = require('./markDriverAtVendorLocation')
const markOrderAsReady = require('./markOrderAsReady')
const markOrderCompleted = require('./markOrderCompleted')
const markOrderReceivedByDriver = require('./markOrderReceivedByDriver')

module.exports = {
    acceptOrder,
    closeOrder,
    confirmOrder,
    createOrder,
    deleteOrderByOrderId,
    getAllOrders,
    getOrdersByCustomerId,
    getOrdersByDriverId,
    getOrdersByUserId,
    getOrdersByVendorId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderCompleted,
    markOrderReceivedByDriver,
}