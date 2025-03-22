const Bond = require('../../models/Bond')

const cancelBond = async (req, res) => {

    const { bondId, userId } = req.body
    
    const bondToCancel = await Bond
        .findByIdAndUpdate(bondId, {
            confirmed: false,
            declined: false,
            cancelled: true,
            actionerId: userId,
        })

    const bond = Bond
        .findOne({ _id: bondToCancel._id })
        .select('_id sender responder confirmed declined cancelled actionerId')

        return res.status(200).json({ bond })
  }

module.exports = cancelBond