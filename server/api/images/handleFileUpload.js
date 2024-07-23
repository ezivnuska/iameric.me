const ensureUploadDirExists = require('./ensureUploadDirExists')
const { promises } = require('fs')
const path = require('path')

const handleFileUpload = async ({ imageData, thumbData }, uploadPath, filename) => {
    
    const regex = /^data:.+\/(.+);base64,(.*)$/

    const image = imageData.uri.match(regex)[2]
    const imageBuffer = Buffer.from(image, 'base64')

    const thumb = thumbData.uri.match(regex)[2]
    const thumbBuffer = Buffer.from(thumb, 'base64')
    
    let dirExists = ensureUploadDirExists(uploadPath)

    const imageFile = path.join(uploadPath, filename)

    try {
        await promises.writeFile(imageFile, imageBuffer)
    } catch (err) {
        console.log('Error writing file:', err)
        return null
    }

    // repeated code

    const thumbPath = path.join(uploadPath, 'thumb')

    dirExists = ensureUploadDirExists(thumbPath)

    const thumbFile = path.join(thumbPath, filename)

    try {
        await promises.writeFile(thumbFile, thumbBuffer)
    } catch (err) {
        console.log('Error writing thumb file:', err)
        return null
    }
    console.log(`returning filename ${filename} at path ${thumbPath}`)
    return filename
}

module.exports = handleFileUpload