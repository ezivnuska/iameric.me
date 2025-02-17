const Memory = require('../../models/Memory')
const User = require('../../models/User')
const handleFileUpload = require('../upload/handleFileUpload')
const saveUserImage = require('../upload/saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const addMemoryImage = async (req, res) => {
    
    // pull values from request body
    const { memoryId, image } = req.body

    let memory = await Memory
        .findOne({ _id: memoryId })

    let user

    if (memory) {

        user = await User
            .findOne({ _id: memory.author })

        const { imageData, thumbData } = image
        const { height, width } = imageData
        
        const filename = `${user._id}-${Date.now()}.png`
        const userDir = path.join(uploadDir, user.username)
        
        const uploadedImage = await handleFileUpload({ imageData, thumbData }, userDir, filename)
        
        if (uploadedImage) {
            const imageSaved = await saveUserImage(user._id, filename, height, width)

            if (imageSaved) {
                const updatedMemory = await Memory.findOneAndUpdate(
                    { _id: memory._id },
                    { $set: { image: imageSaved.image._id } },
                    { new: true }
                )

                if (updatedMemory) {
                    memory = await Memory
                        .findOne({ _id: updatedMemory._id })
                        .populate({
                            path: 'image',
                            select: 'filename height width user',
                            populate: { path: 'user', select: 'username' },
                        })
                        .populate({
                            path: 'author',
                            select: '_id username profileImage',
                            populate: {
                                path: 'profileImage',
                                select: '_id filename',
                            },
                        })
                }

                // if (updatedMemory) {

                //     memory = await Memory
                //         .populate(updatedMemory, {
                //             path: 'image',
                //             select: 'filename height width user',
                //             populate: { path: 'user', select: 'username' },
                //         })
                //         .populate({
                //             path: 'author',
                //             select: '_id username profileImage',
                //             populate: {
                //                 path: 'profileImage',
                //                 select: '_id filename',
                //             },
                //         })
                // }

            } else {
                console.log('Error saving user image/thumb.')
            }
            
        } else {
            console.log('Error uploading post image/thumb.')
        }
    }

    if (memory) return res.status(200).json({ memory })
    
    console.log('Problem adding image to memory.')

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = addMemoryImage