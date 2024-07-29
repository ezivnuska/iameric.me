const Address = require('../../models/Address')
const User = require('../../models/User')

const createOrUpdateAddress = async (req, res) => {
    
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
    
    let address = await Address.findOneAndUpdate({ userId }, { $set: data }, { new: true })
    
    if (!address) address = await Address.create(data)
    
    const user = await User.findOne({ _id: userId })

    if (!user) console.log('could not find user to update address.')
    else {

        user.address = address._id

        await user.save()
    }
    
    return res.status(200).json({ address })
}

module.exports = createOrUpdateAddress