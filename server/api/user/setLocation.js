const User = require('../../models/User')

const setLocation = async (req, res) => {
    
    const { latitude, longitude, userId } = req.body

    const location = { latitude, longitude }
    
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { location } }, { new: true })

    if (!user) console.log('could not find user to set location.')
    else return res.status(200).json({ user })
    return res.status(200).json(null)
}

module.exports = setLocation