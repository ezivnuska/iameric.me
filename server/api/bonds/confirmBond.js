const Bond = require('../../models/Bond')

const confirmBond = async (req, res) => {
    
    const { bondId, userId } = req.body

    try {
        const updatedBond = await Bond
            .findByIdAndUpdate(bondId, {
                $set: {
                    confirmed: true,
                    actionerId: userId,
                },
            })
            
        const bond = await Bond
            .findOne({ _id: updatedBond._id })
            .select('_id sender responder confirmed declined cancelled actionerId')

        return res.status(200).json({ bond })

    } catch (e) {

      console.error('Error confirming bond', e)

      return res.status(200).json(null)
    }
}

module.exports = confirmBond