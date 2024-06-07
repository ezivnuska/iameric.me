const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Entry = require('../../models/Entry')
const Location = require('../../models/Location')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const {
    removeAllImageFilesByUsername,
} = require('../images')
const SESSION_SECRET = process.env.JWT_SECRET || 'super.super.secret.shhhh'//config.JWT_SECRET

const getSanitizedUser = ({ _id, email, location, profileImage, role, username, token, exp }) => ({
    _id,
    email,
    location,
    profileImage,
    role,
    username,
    token,
    exp,
})

const getBaseUser = ({ _id, profileImage, role, username, token }) => ({
    _id,
    profileImage,
    role,
    username,
    token,
})

const updateUserById = async (_id, data) => {
    const updatedUser = await User
        .findOneAndUpdate(
            { _id },
            { $set: data},
            { new: true },
        )
    
    if (!updatedUser) console.log('could not update user with id.')
    else return updatedUser

    return null
}

const clearUserTokenWithToken = async token => {
    const updatedUser = await User
        .findOneAndUpdate(
            { token },
            {
                $set: {
                    token: null,
                    exp: null,
                },
            },
            { new: true },
        )
    
    if (!updatedUser) console.log('could not update user with token.')
    else return updatedUser

    return null
}

const clearUserToken = async _id => {
    const user = await updateUserById(_id, { token: null })
    if (!user) console.log('could not clear user token on sign out.')
    else return user
    return null
}

// returns new token from user data
const createToken = ({ _id, username, email, role, profileImage }) => {
    // set expiration timestamp
    // const expiration = Math.floor(Date.now() / 1000) + ((60 * 60) * 24)
    const expiration = Math.floor(Date.now() / 1000) + ((60 * 1) * 1)
    return {
        token: jwt.sign({
            _id,
            username,
            email,
            role,
            // this needs work...
            profileImage: profileImage ? profileImage.filename : null,
            exp: expiration,
        }, SESSION_SECRET, {}),
        exp: expiration,
    }
}

const getDecodedUser = token => jwt.decode(token, SESSION_SECRET)

const handleSignin = async (req, res) => {
    const { email, password } = req.body
    console.log('email', email)
    
    const user = await User
        .findOne({ email })
        .populate({ path: 'profileImage', select: 'filename width height' })
        
    if (!user) {
        return res.status(200).json({ error: true, invalidField: 'email', msg: 'No user found with that email.' })
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
        return res.status(200).json({ error: true, invalidField: 'password', msg: 'Incorrect password.' })
    }
    
    const { token, exp } = createToken(user)

    user.token = token
    user.exp = exp
    
    await user.save()

    const baseUser = getBaseUser(user)

    console.log(`\nUser signed in: ${user.username}`)
    
    return res.status(200).json({ user: baseUser })
}

const validateToken = async (req, res) => {
    const { token } = req.params
    
    const decodedUser = getDecodedUser(token)

    if (!decodedUser) return res.status(200).json(null)
    
    const { _id, exp } = decodedUser

    if (!_id) return res.status(200).json(null)
    
    const user = await User
        .findOne({ _id })
    
    if (!user) return res.status(200).json(null)

    const newDate = new Date(exp) - Date.now()
    const expired = (newDate > 0)

    if (expired) return res.status(200).json(null)

    return res.status(200).json(user)
}

const createUser = async (email, username, password, role) => {
    
    let user = await User.findOne({ email })
    
    if (user) {
        console.log('user with that email already exists.')
        return null
    } else {
        user = await User.create({ username, email, password, role })
    }

    if (!user) {
        console.log(`Error creating user: ${username}, ${email}`)
        return null
    }
    console.log('user exists', user)
    
    const { token, exp } = createToken(user)
    
    user = await User
        .findOneAndUpdate(
            { _id: user._id },
            { $set: { token, exp } },
            { new: true },
        )
        .populate({ path: 'profileImage', select: 'filename width height' })

    if (!user) {
        console.log('Error updating user with token')
        return null
    }

    return user
}

const handleSignup = async (req, res) => {
    const { email, password, username, role } = req.body
    console.log('password', password)
    
    return bcrypt.genSalt(10, async (err, salt) => {
        console.log('salt', salt)
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log('error with hash', err)
                return res.status(200).json({ error: true, msg: err })
            }
            
            if (!hash) {
                console.log('problem with hash')
                return res.status(200).json({ error: true, msg: 'Problem with hash.' })
            }
            const user = await createUser(email, username, hash, role)

            if (!user) {
                console.log('problem with user')
                return res.status(200).json({ error: true, msg: 'Could not create new user.' })
            } else {
                console.log('new user created:', user)
                return res.status(200).json({ user })
            }
        })
    })
}

const authenticate = async (req, res) => {
    
    const { token } = req.body
    
    console.log('authenticating saved token...')
    
    const userFromToken = getDecodedUser(token)

    if (!userFromToken) return res.status(200).json(null)

    console.log(`\n${userFromToken.username} was previously connected.\n`)
    
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    if (expired) {
        console.log('token expired')
        return res.status(406).json({ userFromToken, error: 'token expired' })
    }

    const user = await User
        .findOne({ _id: userFromToken._id })
        .populate('profileImage', 'filename width height')
        .populate('location')

    if (!user) {
        console.log('failed to refresh user token')
        return res.status(200).json(null)
    }

    const data = createToken(user)
    
    user.token = data.token
    user.exp = data.exp

    await user.save()

    if (!user) {
        console.log('Error saving user with updated token')
        return res.status(200).json(null)
    }

    // return res.status(200).json({ user: getSanitizedUser(user) })
    return res.status(200).json({ user })
}

const handleSignout = async (req, res) => {
    
    const user = await clearUserTokenWithToken(req.params.token)

    // const sessionId = req.session.id
  
    // req.session.destroy(() => {
    //     // disconnect all Socket.IO connections linked to this session ID
    //     io.in(sessionId).disconnectSockets()
    // })

    if (!user) console.log('could not update user.')
    else {
        console.log(`\nUser signed out: ${user.username}`)
        return res.status(200).json(user)
    }
    
    return res.status(200).json(null)
}

const deleteAccount = async (req, res) => {
    const { id } = req.body

    console.log(`\ndeleting account: ${id}`)

    const deletedEntries = await Entry.deleteMany({ user: id })
    
    if (!deletedEntries) {
        console.log('could not delete entries.')
    } else {
        console.log(`deleted ${deletedEntries.deletedCount} entries`)
    }

    const deletedLocation = await Location.deleteOne({ user: id })
    if (!deletedLocation) {
        console.log('could not delete user location.')
    } else {
        console.log(`deleted ${deletedLocation.deletedCount} location`)
    }

    const deletedImages = await UserImage.deleteMany({ user: id })
    
    if (!deletedImages) {
        console.log('could not delete images.')
    } else {
        console.log(`deleted ${deletedImages.deletedCount} images`)
    }

    const deletedUser = await User.findOneAndDelete({ _id: id })
    
    if (!deletedUser) {
        console.log('Error deleting user.')
        return res.status(200).json({
            success: false,
            msg: 'Error closing account.'
        })
    }
    
    const imagesRemoved = removeAllImageFilesByUsername(deletedUser.username)
    if (imagesRemoved) console.log('Image files removed.')

    return res.status(200).json({
        success: true,
        msg: 'Account closed.'
    })
}

module.exports = {
    authenticate,
    deleteAccount,
    handleSignin,
    handleSignout,
    handleSignup,
    validateToken,
}