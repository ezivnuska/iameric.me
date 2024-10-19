const BipImage = require('../../models/BipImage')

const saveBipImage = async data => {

    const { bipId, path, filename, height, width, location } = data

    const bipImage = {
        bipId,
        path,
        filename,
        height,
        width,
    }

    if (location) bipImage.location = location
    
    let image = await BipImage.create(bipImage)

    image = await BipImage
        .findOne({ _id: image._id })
    
    return image
}

module.exports = saveBipImage