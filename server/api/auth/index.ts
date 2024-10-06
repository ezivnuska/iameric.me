const authenticate = require('./authenticate')
const createToken = require('./createToken')
const createUser = require('./createUser')
const deleteAccount = require('./deleteAccount')
const getDecodedUser = require('./getDecodedUser')
const handleSignIn = require('./handleSignIn')
const handleSignOut = require('./handleSignOut')
const handleSignUp = require('./handleSignUp')
const validateToken = require('./validateToken')

module.exports = {
    authenticate,
    createToken,
    createUser,
    deleteAccount,
    getDecodedUser,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    validateToken,
}