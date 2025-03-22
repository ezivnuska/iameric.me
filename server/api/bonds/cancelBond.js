const Bond = require('../../models/Bond')

const cancelBond = async (req, res) => {

    const { bondId, userId } = req.body
    
    let updatedBond = await Bond
        .findByIdAndUpdate(bondId, {
            $set: {
                confirmed: false,
                cancelled: true,
                actionerId: userId,
            },
        })
    
    const bond = await Bond
        .findById(updatedBond._id)
        .select('_id sender responder confirmed declined cancelled actionerId')
    
    return res.status(200).json({ bond })
  }

module.exports = cancelBond