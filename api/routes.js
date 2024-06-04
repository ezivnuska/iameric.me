const {
    authenticate,
    deleteAccount,
    handleSignin,
    handleSignout,
    handleSignup,
    validateToken,
} = require('./auth')

const {
    getUser,
} = require('./user')

const {
    getUsers,
    getUserDetailsById,
    getNumberOfOnlineUsers,
    getAllVendors,
    getUserById,
    getUserAndImagesById,
    getVendor,
} = require('./users')

const {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
    getImageIdFromFilename,
    getProfileImageByUserId,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
} = require('./images')

const {
    createOrUpdateProduct,
    deleteProductById,
    getProductById,
    getProductsByVendorId,
    addImageIdToProduct,
} = require('./products')

const {
    createOrUpdateLocation,
    getLocationByUserId,
    getUserLocationWithLocationId,
} = require('./location')

const {
    acceptOrder,
    closeOrder,
    confirmOrder,
    createOrder,
    deleteOrderByOrderId,
    getAllOrders,
    // getOrderIdsByUserId,
    getOrdersByCustomerId,
    getOrdersByDriverId,
    getOrdersByUserId,
    getOrdersByVendorId,
    getRelevantOrdersByUserId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderCompleted,
    markOrderReceivedByDriver,
} = require('./orders')
    
// not currently using entries
const {
    createEntry,
    deleteEntryById,
    getEntries,
} = require('./entries')

const apiRoutes = app => {

    // auth
    app.post(   '/signin',                 handleSignin)
    app.post(   '/signup',                 handleSignup)
    app.post(   '/authenticate',           authenticate)
    app.get(    '/signout/:id',            handleSignout)
    app.post(   '/unsubscribe',            deleteAccount)
    app.get(    '/token/:token',           validateToken)

    // user
    app.get(    '/profile/:id',             getUser)

    // users
    app.get(    '/user/:id',                getUserById)
    app.get(    '/user/full/:id',           getUserAndImagesById)
    app.get(    '/user/details/:id',        getUserDetailsById)
    app.get(    '/users',                   getUsers)
    app.get(    '/users/online',            getNumberOfOnlineUsers)
    app.get(    '/vendor/:id',              getVendor)
    app.get(    '/vendors',                 getAllVendors)

    // entries
    app.post(   '/entry',                   createEntry)
    app.get(    '/entries',                 getEntries)
    app.delete( '/entry/delete/:id',        deleteEntryById)

    // location
    app.post(   '/location',                createOrUpdateLocation)
    app.get(    '/location/:userId',        getLocationByUserId)
    app.get(    '/user/location/:locationId', getUserLocationWithLocationId)

    // products
    app.post(   '/product',                 createOrUpdateProduct)
    app.delete( '/products/delete/:id',     deleteProductById)
    app.get(    '/products/:vendor',        getProductsByVendorId)
    app.post(   '/product/image',           addImageIdToProduct)
    app.get(    '/product/:id',             getProductById)

    // images
    app.post(   '/user/avatar',             updateProfileImage)
    app.post(   '/image/upload',            uploadImage)
    app.get(    '/image/:id',               getImageWithUsernameByImageId)
    app.get(    '/avatar/:id',              getProfileImageByUserId)
    app.get(    '/user/images/:id',         getImagesByUserId)
    app.post(   '/upload/avatar',           uploadAvatar)
    app.post(   '/images/delete',           deleteImageById)
    app.post(   '/product/image/upload',    uploadProductImage)
    app.post(   '/preview/delete',          deletePreview)
    app.get(    '/images/:name',            getImageIdFromFilename)

    // orders
    app.get(    '/orders/:id',              getRelevantOrdersByUserId)
    app.get(    '/orders/admin/:id',        getAllOrders)
    app.get(    '/orders/user/:id',         getOrdersByUserId)
    app.get(    '/orders/customer/:id',     getOrdersByCustomerId)
    app.get(    '/orders/driver/:id',       getOrdersByDriverId)
    app.get(    '/orders/vendor/:id',       getOrdersByVendorId)
    app.post(   '/order',                   createOrder)
    app.post(   '/order/confirm',           confirmOrder)
    app.post(   '/order/accept',            acceptOrder)
    app.post(   '/order/ready',             markOrderAsReady)
    app.post(   '/order/arrived',           markDriverAtVendorLocation)
    app.post(   '/order/received',          markOrderReceivedByDriver)
    app.post(   '/order/complete',          markOrderCompleted)
    app.post(   '/order/close',             closeOrder)
    app.delete( '/order/:id',               deleteOrderByOrderId)
}

module.exports = apiRoutes