const Location = require('../../models/Location')
const User = require('../../models/User')

const createOrUpdateLocation = async (req, res) => {
    
    const { userId, username, address1, address2, city, state, zip } = req.body

    const data = {
        userId,
        username,
        address1,
        address2,
        city,
        state,
        zip
    }
    
    let location = await Location.findOneAndUpdate({ userId }, { $set: data }, { new: true })
    
    if (!location) location = await Location.create(data)
    
    const user = await User.findOne({ _id: userId })

    // not likely, but just in case...
    if (!user) console.log('could not find user to update location.')
    else {
        // set user location
        user.location = location._id

        // save user before continuing
        await user.save()

        // return location data
        return res.status(200).json({ location })
    }
        
    return res.status(200).json({ location })
}

module.exports = createOrUpdateLocation