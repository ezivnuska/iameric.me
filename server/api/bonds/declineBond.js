const Bond = require('../../models/Bond')

const declineBond = async (req, res) => {
    
    const { bondId, userId } = req.body

    let declinedBond = await Bond
        .findByIdAndUpdate(bondId, {
            $set: {
                confirmed: false,
                cancelled: true,
                declined: true,
                actionerId: userId,
            }
        })
        
    if (declinedBond) {
    
        const bond = await Bond
            .findById(declinedBond._id)
            .select('_id sender responder confirmed declined cancelled actionerId')
        
        return res.status(200).json({ bond })
    }

    return res.status(200).json(null)
}

module.exports = declineBond