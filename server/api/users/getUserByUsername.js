const User = require('../../models/User')

const getUserByUsername = async (req, res) => {

    const user = await User
        .findOne({ username: req.params.username })
        .select('_id email username role profileImage')
        .populate({ path: 'profileImage', select: '_id filename' })
    
    if (user) return res.status(200).json({ user })
    else console.log('could not get user by username.')
    
    return res.status(406).json(null)
}

module.exports = getUserByUsername