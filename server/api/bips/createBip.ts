const Bip = require('../../models/Bip')

const createBip = async (req, res) => {

    const { user, location } = req.body
    let bip = await Bip.create({ user })
    if (!bip) {
        console.log('Error creating new bip.')
        return res.status(200).json(null)
    }

    if (location) {
        console.log('adding bip location', location)
        bip.location = location
        await bip.save()
    }

    bip = await Bip.findOne({ _id: bip._id })
        .populate('user')

    return res.status(200).json({ bip })
    
}

module.exports = createBip