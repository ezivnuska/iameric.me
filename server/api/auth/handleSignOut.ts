const User = require('../../models/User')

const handleSignOut = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                available: false,
                token: null,
                exp: null,
            }
        },
        { new: true },
    )

    if (user) return res.status(200).json(user)
    else console.log('could not update user.')
    
    return res.status(200).json(null)
}

module.exports = handleSignOut