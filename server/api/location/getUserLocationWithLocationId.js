const Location = require('../../models/Location')

const getUserLocationWithLocationId = async (req, res) => {
    const { locationId } = req.params
    const location = await Location.findOne({ _id: locationId })
    if (!location) console.log('No user location found.')
    else return res.json({ location })
    return res.json({ location: null })
}

module.exports = getUserLocationWithLocationId