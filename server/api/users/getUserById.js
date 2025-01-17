const User = require('../../models/User')

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('_id username role profileImage')
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (!user) console.log('could not get user by id.')
    else return res.status(200).json({ user })

    return res.status(406).json(null)
}

module.exports = getUserById