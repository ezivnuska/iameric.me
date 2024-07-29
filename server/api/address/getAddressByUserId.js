const Address = require('../../models/Address')

const getAddressByUserId = async (req, res) => {
    const { userId } = req.params
    const address = await Address.findOne({ userId })
    if (!address) console.log('No user address found.')
    else return res.json({ address })
    return res.json(null)
}

module.exports = getAddressByUserId