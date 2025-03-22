const Bond = require('../../models/Bond')

const removeBond = async (req, res) => {
    
    const { bondId, userId } = req.body

    const bondToRemove = await Bond
        .findByIdAndUpdate(bondId, {
            confirmed: false,
            declined: true,
            cancelled: true,
            actionerId: userId,
        })

    const bond = await Bond
        .findOne({ _id: bondToRemove._id })
        .select('_id sender responder confirmed declined cancelled actionerId')

    return res.status(200).json({ bond })
}

module.exports = removeBond