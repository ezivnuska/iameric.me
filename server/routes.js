const express = require('express')
const router = express.Router()

const {
    authenticate,
    deleteAccount,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    validateToken,
  } = require('./api/auth')
  
  const {
    // addToDeposit,
    // withdrawDeposit,
    getUser,
    setLocation,
    // getProfileImage,
    // toggleStatus,
  } = require('./api/user')
  
  const {
    getAvailableUsers,
    getUsers,
    getUserDetailsById,
    getNumberOfOnlineUsers,
    getAllVendors,
    getVendors,
    // getUserById,
    getUserByUsername,
    getUserAndImagesById,
    getVendor,
  } = require('./api/users')
  
  const {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
    getImageIdFromFilename,
    getProfileImageByUserId,
    loadImage,
    setImageCaption,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
  } = require('./api/images')
  
  const {
    createOrUpdateProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductsByVendorId,
    addImageIdToProduct,
  } = require('./api/products')
  
  const {
    createOrUpdateAddress,
    getAddressByUserId,
    getUserAddressWithAddressId,
  } = require('./api/address')
  
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
    // getRelevantOrdersByUserId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderCompleted,
    markOrderReceivedByDriver,
  } = require('./api/orders')
    
  // not currently using entries
  const {
    createEntry,
    deleteEntryById,
    getEntries,
  } = require('./api/entries')

  const {
    createMessage,
    deleteMessageById,
    getMessage,
    getMessages,
  } = require('./api/mail')

// auth
router.post(   '/signin',                 handleSignIn)
router.post(   '/signup',                 handleSignUp)
router.post(   '/authenticate',           authenticate)
router.get(    '/signout/:id',            handleSignOut)
router.post(   '/unsubscribe',            deleteAccount)
router.get(    '/token/:token',           validateToken)

// user
router.get(    '/profile/:id',            getUser)
router.post(   '/location',           setLocation)
// router.post(   '/deposit',                addToDeposit)
// router.post(   '/deposit/withdraw',       withdrawDeposit)
// router.get(    '/profile/image/:id',      getProfileImage)
// router.post(   '/profile/status',         toggleStatus)

// users
router.get(    '/user/:username',          getUserByUsername)
router.get(    '/user/full/:id',           getUserAndImagesById)
router.get(    '/user/details/:id',        getUserDetailsById)
router.get(    '/users',                   getUsers)
router.get(    '/users/available',         getAvailableUsers)
router.get(    '/users/online',            getNumberOfOnlineUsers)
router.get(    '/vendor/:id',              getVendor)
router.get(    '/vendors',                 getVendors)
// router.get(    '/vendors',                 getAllVendors)

// entries
router.post(   '/entry',                   createEntry)
router.get(    '/entries',                 getEntries)
router.delete( '/entry/delete/:id',        deleteEntryById)

// mail
router.post(   '/message',                 createMessage)
router.get(    '/message/:id',             getMessage)
router.get(    '/messages/:id',            getMessages)
router.delete( '/message/delete/:id',      deleteMessageById)

// address
router.post(   '/address',                 createOrUpdateAddress)
router.get(    '/address/:userId',         getAddressByUserId)
router.get(    '/user/address/:addressId', getUserAddressWithAddressId)

// products
router.post(   '/product',                 createOrUpdateProduct)
router.get(    '/products',                getAllProducts)
router.delete( '/products/delete/:id',     deleteProductById)
router.get(    '/products/:vendor',        getProductsByVendorId)
router.post(   '/product/image',           addImageIdToProduct)
router.get(    '/product/:id',             getProductById)

// images
router.post(   '/user/avatar',             updateProfileImage)
router.post(   '/image/upload',            uploadImage)
// router.get(    '/image/:id',               getImageWithUsernameByImageId)
router.get(    '/image/:id',               loadImage)
router.get(    '/avatar/:id',              getProfileImageByUserId)
router.post(   '/user/image/caption',      setImageCaption)
router.get(    '/user/images/:id',         getImagesByUserId)
router.post(   '/upload/avatar',           uploadAvatar)
router.post(   '/images/delete',           deleteImageById)
router.post(   '/product/image/upload',    uploadProductImage)
router.post(   '/preview/delete',          deletePreview)
router.get(    '/images/:name',            getImageIdFromFilename)

// orders
router.get(    '/orders/all',              getAllOrders)
// router.get(    '/orders/:id',              getRelevantOrdersByUserId)
router.get(    '/orders/admin/:id',        getAllOrders)
router.get(    '/orders/user/:id',         getOrdersByUserId)
router.get(    '/orders/customer/:id',     getOrdersByCustomerId)
router.get(    '/orders/driver/:id',       getOrdersByDriverId)
router.get(    '/orders/vendor/:id',       getOrdersByVendorId)
router.post(   '/order',                   createOrder)
router.post(   '/order/confirm',           confirmOrder)
router.post(   '/order/accept',            acceptOrder)
router.post(   '/order/ready',             markOrderAsReady)
router.post(   '/order/arrived',           markDriverAtVendorLocation)
router.post(   '/order/received',          markOrderReceivedByDriver)
router.post(   '/order/complete',          markOrderCompleted)
router.post(   '/order/close',             closeOrder)
router.delete( '/order/:id',               deleteOrderByOrderId)

module.exports = router