const Address = require('../../models/Address')

const getUserAddressWithAddressId = async (req, res) => {
    const { addressId } = req.params
    const address = await Address.findOne({ _id: addressId })
    if (!address) console.log('No user address found.')
    else return res.status(200).json({ address })
    return res.status(200).json(null)
}

module.exports = getUserAddressWithAddressId