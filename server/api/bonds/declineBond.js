const Bond = require('../../models/Bond')

const declineBond = async (req, res) => {
    
    const { bondId, userId } = req.body
    
    const existingBond = await Bond
        .findById(bondId)
        .select('_id sender responder confirmed declined cancelled actionerId')

    const updatedBond = await Bond
        .update({ _id: existingBond._id }, {
            declined: true,
            confirmed: false,
            actionerId: userId,
        })

    const bond = await Bond
        .findById(updatedBond._id)
        .select('_id sender responder confirmed declined cancelled actionerId')

    return res.status(200).json({ bond })
}

module.exports = declineBond