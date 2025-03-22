const Bond = require('../../models/Bond')

const deleteBond = async (req, res) => {

    const { bondId } = req.body
    
    const bond = await Bond
        .findOneAndRemove({ _id: bondId })
        .select('_id sender responder confirmed declined cancelled actionerId')

    return res.status(200).json({ bond })
}

module.exports = deleteBond