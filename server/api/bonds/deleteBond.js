const Bond = require('../../models/Bond')

const deleteBond = async (req, res) => {

    const { bondId } = req.body
    
    const bond = await Bond
        .findByIdAndDelete(bondId)

    return res.status(200).json({ bond })
}

module.exports = deleteBond