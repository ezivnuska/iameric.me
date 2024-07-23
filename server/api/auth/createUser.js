const createToken = require('./createToken')
const User = require('../../models/User')

const createUser = async (email, hashedPassword, username, fiction) => {
    
    let user = await User.findOne({ email })
    
    if (user) {
        console.log('user with that email already exists.')
        return null
    } else {
        user = await User.create({ email, password: hashedPassword, username, fiction })
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
        .populate('profileImage', 'filename width height')
        .populate('location')

    if (user) return user
    else console.log('Error updating user with token')
    
    return null

}

module.exports = createUser