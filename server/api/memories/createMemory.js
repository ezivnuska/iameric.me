const Memory = require('../../models/Memory')
const User = require('../../models/User')
const handleFileUpload = require('../upload/handleFileUpload')
const saveUserImage = require('../upload/saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const createMemory = async (req, res) => {
    
    // pull values from request body
    
    const { author, body, day, month, year, image, threadId, title } = req.body
    
    let memory = { author, body, day, month, year, image, threadId, title }

    if (threadId) {
        memory = await Memory.findOne({ _id: threadId })
    }
    
    const user = await User
        .findOne({ _id: author })
    
    let savedImage = null

    if (image) {
    
        const { imageData, thumbData } = image

        if (imageData) {

            const { height, width } = imageData
            
            const filename = `${user._id}-${Date.now()}.png`
            const userDir = path.join(uploadDir, user.username)
            
            const uploadedImage = await handleFileUpload({ imageData, thumbData }, userDir, filename)
            console.log('uploadedImage', uploadedImage)
            
            if (!uploadedImage) {
                console.log('Error uploading post image/thumb.')
                return res.status(200).json(null)
            }
            
            savedImage = await saveUserImage(user._id, filename, height, width)
            console.log('savedImage', savedImage)
        }

        if (!savedImage.image) {
            console.log('Error saving user image/thumb.')
            // return res.status(200).json(null)
        }

    }


    if (!threadId) {
        // create a new mongo Post doc
        memory = await Memory.create({ author, body, day, month, year, image: savedImage?.image._id || null, title })
    } else {
        const data = { body, day, month, year, threadId, title, image: savedImage?.image || null }
        memory = await Memory.findOneAndUpdate(
            { _id: author },
            { $set: data },
            { new: true },
        )
        console.log('edited memory', memory)
        // { author, body, day, month, year, image: savedImage?.image._id || null, title })
    }

    // if error, notify console
    // if (memory) {
        // if (!memory.threadId) {
        //     memory.threadId = memory._id
        //     await memory.save()
        // }
        // fetch new (populated) Entry
        // const newMemory = await Memory
        //     .findOne({ _id: memory._id })
        //     .populate({
        //         path: 'author',
        //         select: 'username profileImage',
        //         populate: { path: 'profileImage' },
        //     })
        //     .populate({ path: 'image' })

            console.log('memory', memory)
        // return updated Entry document
        return res.json({ memory })
    // }

    console.log('Problem creating new Memory.')

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createMemory