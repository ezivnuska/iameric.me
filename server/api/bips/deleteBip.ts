const Bip = require('../../models/Bip')
const BipImage = require('../../models/BipImage')
const { removeAllBipImagesById } = require('../images')

const deleteBip = async (req, res) => {

    const { id } = req.body

    const removedImages = await removeAllBipImagesById(id)
    if (!removedImages) {
        console.log('Error: no images were removed')
    } else {
        console.log(`removed bip images:`, removedImages)
        const deletedImages = await BipImage.deleteMany({ bipId: id })
        console.log('bip image docs removed from database', deletedImages)
        if (!deletedImages) {
            console.log('could not delete bip images.')
        } else {
            console.log(`deleted ${deletedImages.deletedCount} images`)
        }
    }

    const deletedBip = await Bip.findOneAndDelete({ _id: id })
    
    if (!deletedBip) {
        console.log('Error deleting bip.')
        return res.status(200).json({
            success: false,
            msg: 'Error deleting bip.'
        })
    }

    return res.status(200).json({ bip: deletedBip })
}

module.exports = deleteBip