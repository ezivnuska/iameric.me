const Location = require('../../models/Location')

const getLocationByUserId = async (req, res) => {
    const { userId } = req.params
    const location = await Location.findOne({ userId })
    if (!location) console.log('No user location found.')
    else return res.json({ location })
    return res.json(null)
}

module.exports = getLocationByUserId