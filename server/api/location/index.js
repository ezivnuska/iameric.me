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
    if (!user) {
        console.log('could not find user to update location.')
        return res.status(200).json({ location })
    }

    // set user location
    user.location = location._id

    // save user before continuing
    await user.save()

    // return location data
    return res.status(200).json({ location })
    
}

const getLocationByUserId = async (req, res) => {
    const { userId } = req.params
    const location = await Location.findOne({ userId })
    if (!location) console.log('No user location found.')
    else return res.json({ location })
    return res.json(null)
}

const getUserLocationWithLocationId = async (req, res) => {
    
    const { locationId } = req.params
    
    const location = await Location
        .findOne({ _id: locationId })

    if (!location) {
        console.log('No user location found.')
        return res.json({ location: null })
    }

    return res.json({ location })
}

module.exports = {
    createOrUpdateLocation,
    getLocationByUserId,
    getUserLocationWithLocationId,
}