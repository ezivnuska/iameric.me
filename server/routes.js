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
  getUserIds,
  getUsers,
  getUserDetailsById,
  getNumberOfOnlineUsers,
  getAllVendors,
  getVendors,
  getUserAndImageIds,
  getUserById,
  getUserByUsername,
  getUserAndImagesById,
  getVendor,
} = require('./api/users')

const {
  deleteImageById,
  deletePreview,
  getBipImages,
  getImagesByUserId,
  getImageWithUsernameByImageId,
  getImageIdFromFilename,
  getProfileImageByUserId,
  getUserFromImageId,
  loadImage,
  setImageCaption,
  updateProfileImage,
} = require('./api/images')

const {
  uploadAvatar,
  uploadBipImage,
  uploadImage,
  uploadProductImage,
} = require('./api/upload')

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
  getThread,
} = require('./api/entries')

const {
  addMemoryImage,
  createMemory,
  deleteAllMemoriesByUserId,
  deleteMemoryById,
  getMemory,
  getMemories,
  getMemoryThread,
  removeMemoryImage,
} = require('./api/memories')

const {
  removePostImage,
  addPostImage,
  createPost,
  deletePostById,
  getPost,
  getPosts,
  getPostThread,
} = require('./api/posts')

const {
  createMessage,
  deleteMessageById,
  getMessage,
  getMessages,
} = require('./api/mail')

const {
  createBip,
  deleteBip,
  getBip,
  getBips,
} = require('./api/bips')

// auth
router.post(   '/signin',                 handleSignIn)
router.post(   '/signup',                 handleSignUp)
router.post(   '/authenticate',           authenticate)
router.get(    '/signout/:id',            handleSignOut)
router.post(   '/unsubscribe',            deleteAccount)
router.get(    '/token/:token',           validateToken)

// user
router.get(    '/profile/:id',            getUser)
router.post(   '/location',               setLocation)
// router.post(   '/deposit',                addToDeposit)
// router.post(   '/deposit/withdraw',       withdrawDeposit)
// router.get(    '/profile/image/:id',      getProfileImage)
// router.post(   '/profile/status',         toggleStatus)

// users
router.get(    '/user/:id',                getUserById)
router.get(    '/username/:username',      getUserByUsername)
router.get(    '/user/:username/images',   getUserAndImageIds)
router.get(    '/user/full/:id',           getUserAndImagesById)
router.get(    '/user/details/:id',        getUserDetailsById)
router.get(    '/users/ids',               getUserIds)
router.get(    '/users',                   getUsers)
router.get(    '/users/available',         getAvailableUsers)
router.get(    '/users/online',            getNumberOfOnlineUsers)
router.get(    '/vendor/:id',              getVendor)
router.get(    '/vendors',                 getVendors)
// router.get(    '/vendors',                 getAllVendors)

// entries
router.post(   '/entry',                   createEntry)
router.get(    '/entries',                 getEntries)
router.get(    '/thread/:threadId',        getThread)
router.delete( '/entry/delete/:id',        deleteEntryById)

// memories
router.post(   '/memory/image/delete',     removeMemoryImage)
router.post(   '/memory',                  createMemory)
router.post(   '/memory/image',            addMemoryImage)
router.get(    '/memory/:memoryId',        getMemory)
router.get(    '/memories',                getMemories)
router.get(    '/memory/thread/:threadId', getMemoryThread)
router.delete( '/memory/delete/:id',       deleteMemoryById)

// posts
router.post(   '/post/image/delete',       removePostImage)
router.post(   '/post/image',              addPostImage)
router.post(   '/post',                    createPost)
router.get(    '/post/:postId',            getPost)
router.get(    '/posts',                   getPosts)
router.get(    '/post/thread/:threadId',   getPostThread)
router.delete( '/post/delete/:id',         deletePostById)

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
router.get(    '/image/:id',               loadImage)
router.post(   '/image/upload',            uploadImage)
// router.get(    '/image/:id',               getImageWithUsernameByImageId)
router.get(    '/avatar/:id',              getProfileImageByUserId)
router.get(    '/image/owner/:id',         getUserFromImageId)
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

router.post(   '/bip/image/upload',        uploadBipImage)
router.get(    '/bip/:id',                 getBip)
router.get(    '/bip/images/:id',          getBipImages)
router.post(   '/bip/delete',              deleteBip)
router.post(   '/bip',                     createBip)
router.get(    '/bips',                    getBips)

module.exports = router