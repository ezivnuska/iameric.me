const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const {
    removeAllImagesFilesByUsername,
} = require('../images')
const SESSION_SECRET = process.env.JWT_SECRET || require('../../config').JWT_SECRET

const getSanitizedUser = ({ _id, email, location, profileImage, role, username, token }) => ({
    _id,
    email,
    location,
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
    
    if (!updatedUser) {
        console.log('could not update user.')
        return null
    }

    return updatedUser
}

const clearUserToken = async _id => {
    
    const user = await updateUserById(_id, { token: null })
    
    if (!user) {
        console.log('could not clear user token on sign out.')
        return null
    }
    return user
}

// returns new token from user data
const createToken = ({ _id, username, email, role, profileImage }) => {
    // set expiration timestamp
    const expiration = Math.floor(Date.now() / 1000) + ((60 * 60) * 24)
    return jwt.sign({
        _id,
        username,
        email,
        role,
        // this needs work...
        profileImage: profileImage ? profileImage.filename : null,
        exp: expiration,
    }, SESSION_SECRET, {})
}

const getDecodedUser = token => jwt.decode(token, SESSION_SECRET)

const handleSignin = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.
        findOne({ email })
        // .populate('profileImage', 'filename')

    if (!user)
        return res.status(406).json({ invalid: 'email', msg: 'No user found with that email.' })
    
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch)
        return res.status(406).json({ invalid: 'password', msg: 'Could not verify user.' })

    user.token = createToken(user)

    await user.save()

    const sanitizedUser = getSanitizedUser(user)

    console.log(`\nUser signed in: ${user.username}`)
    
    return res.status(200).json(sanitizedUser)
}

const createUser = async ({ email, username }) => {
    
    let user = await User.findOne({ email })
    
    if (user) {
        console.log('A user with that email already exists.')
        return res.status(200).json({ success: false })
    }

    user = await User.create({ username, email })

    if (!user) {
        console.log(`Error creating user: ${username}, ${email}`)
        return null
    }
    
    await user.save()

    console.log('New user created', user.username)
    
    const newToken = createToken(user)
    
    user = await User
        .findOneAndUpdate(
            { _id: newUser._id },
            { $set: { token: newToken } },
            { new: true },
        )
        .populate('profileImage', 'filename')

    if (!user) {
        console.log('Error updating user with token')
        return null
    }

    console.log(`User created: ${user.username}`)

    return user
}

const handleSignup = async (req, res) => {
    
    return bcrypt.hash(req.body.password, 10, async (err, hashedPW) => {
        
        if (err) return res.status(406).json({ success: false })

        const user = await createUser({...req.body, password: hashedPW})

        if (!user) return res.status(406).json({ success: false })

        return res.status(200).json({ user })
    })
}

const authenticate = async (req, res) => {
    
    const { token } = req.body
    
    console.log('authenticating saved token...')
    
    const userFromToken = getDecodedUser(token)
    
    console.log(`\n${userFromToken.username} was previously connected.\n`)
    
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    if (expired) {
        console.log('token expired')
        return res.status(406).json({ userFromToken, error: 'token expired' })
    }

    const user = await User
        .findOne({ _id: userFromToken._id })

    if (!user) {
        console.log('failed to refresh user token')
        return res.status(200).json(null)
    }

    user.token = createToken(user)

    await user.save()

    if (!user) {
        console.log('Error saving user with updated token')
        return res.status(200).json(null)
    }

    return res.status(200).json({ user: getSanitizedUser(user) })
}

const handleSignout = async (req, res) => {
    
    const user = await updateUserById(req.body._id, { token: null })

    if (!user) {
        console.log('could not update user.')
        return res.status(200).json(null)
    }

    console.log(`\nUser signed out: ${user.username}`)

    return res.status(200).json({ user })
}

const closeAccount = async (req, res) => {
    const { _id } = req.body
    const deletedEntry = await Entry
        .deleteOne({ userId: _id })
    
    if (!deletedEntry) {
        console.log('could not delete entries.')
    }

    const deletedImages = await UserImage
        .deleteMany({ user: _id })

    if (!deletedImages) {
        console.log('could not delete images.')
    } else {
        console.log(`deleted ${deletedImages.deletedCount} images`)
    }

    const deletedUser = await User
        .deleteOne({ _id })
    
    if (!deletedUser) {
        console.log('Error deleting user.')
    }

    
    console.log('User deleted.', deletedUser)
    
    await removeAllImagesFilesByUsername(deletedUser.username)

    res.status(200).json({
        msg: 'Account closed.'
    })
}

module.exports = {
    authenticate,
    closeAccount,
    handleSignin,
    handleSignout,
    handleSignup,
}