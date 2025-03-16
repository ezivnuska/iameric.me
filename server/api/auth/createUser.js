const createToken = require('./createToken')
const User = require('../../models/User')

const createUser = async (email, hashedPassword, username) => {
    
    let user = await User.create({ email, password: hashedPassword, username })

    if (!user) {
        console.log(`Error creating user: ${username}, ${email}`)
        return null
    }
    
    const { token, exp } = createToken(user)
    
    user = await User
        .findOneAndUpdate(
            { _id: user._id },
            { $set: { token, exp } },
            { new: true },
        )
        .select('createdAt email exp role token username')

    if (user) return user
    else console.log('Error updating user with token')
    
    return null

}

module.exports = createUser