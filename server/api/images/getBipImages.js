const BipImage = require('../../models/BipImage')

const getBipImages = async (req, res) => {
    
    const images = await BipImage
        .find({ bipId: req.params.id })

    return res.status(200).json({ images })
}

module.exports = getBipImages