const ensureUploadDirExists = require('./ensureUploadDirExists')
const { promises } = require('fs')
const path = require('path')

const uploadFile = async (image, dir, filename) => {
    
    const buffer = Buffer.from(image, 'base64')
    let dirExists = await ensureUploadDirExists(dir)
    const fullPath = `${dir}/${filename}`

    try {
        await promises.writeFile(fullPath, buffer)
    } catch (err) {
        console.log('Error writing file:', err)
        return false
    }

    return true
}

const handleFileUpload = async ({ imageData, thumbData }, uploadPath, filename) => {
    const regex = /^data:.+\/(.+);base64,(.*)$/

    const image = imageData.uri.match(regex)[2]
    await uploadFile(image, uploadPath, filename)
    
    const thumb = thumbData.uri.match(regex)[2]

    const thumbPath = path.join(uploadPath, 'thumb')

    await uploadFile(thumb, thumbPath, filename)
    
    return filename
}

module.exports = handleFileUpload