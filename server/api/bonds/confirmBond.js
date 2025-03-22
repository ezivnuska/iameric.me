const Bond = require('../../models/Bond')

const confirmBond = async ({ bondId, userId }) => {
    
    try {
        const existingBond = await Bond
            .findByIdAndUpdate(bondId, {
                confirmed: true,
                declined: false,
                actionerId: userId,
            })

        const bond = await Bond
            .findOne({ _id: existingBond._id })
            .select('_id sender responder confirmed declined cancelled actionerId')

        return res.status(200).json({ bond })

    } catch (e) {

      console.error('Error confirming bond', e)

      return res.status(200).json(null)
    }
}

module.exports = confirmBond