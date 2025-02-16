const Memory = require('../../models/Memory')
const User = require('../../models/User')
const handleFileUpload = require('../upload/handleFileUpload')
const saveUserImage = require('../upload/saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const createMemory = async (req, res) => {
    
    // pull values from request body
    
    const { _id, author, body, day, month, year, image, threadId, title } = req.body
    
    let memory

    if (_id) {
        memory = await Memory.findOneAndUpdate(
            { _id },
            { $set: { body, day, month, year, title } },
            { new: true },
        )
        .populate({
            path: 'author',
            select: '_id username profileImage',
            populate: {
                path: 'profileImage',
                select: '_id filename',
            },
        })
    } else {
        memory = await Memory.create({ author, body, day, month, year, title })
    }

    if (!memory) {
        console.log('Could not find or create memory.')
        return res.status(200).json(null)
    }

    if (image) {
        
        const user = await User
            .findOne({ _id: author })

        const { imageData, thumbData } = image
        const { height, width } = imageData
        
        const filename = `${user._id}-${Date.now()}.png`
        const userDir = path.join(uploadDir, user.username)
        
        const uploadedImage = await handleFileUpload({ imageData, thumbData }, userDir, filename)
        console.log('uploadedImage', uploadedImage)
        
        if (uploadedImage) {
            const imageSaved = await saveUserImage(user._id, filename, height, width)

            console.log('imageSaved', imageSaved)
            if (imageSaved) {
                memory = await Memory.findOneAndUpdate(
                    { _id: memory._id },
                    { $set: { image: imageSaved.image._id } },
                    { new: true }
                )
                .populate({
                    path: 'author',
                    select: '_id username profileImage',
                    populate: {
                        path: 'profileImage',
                        select: '_id filename',
                    },
                })
            } else {
                console.log('Error saving user image/thumb.')
                // return res.status(200).json(null)
            }
            
            // console.log('newUserImage', newUserImage)
            // memory.image = newUserImage._id
        } else {
            console.log('Error uploading post image/thumb.')
            // return res.status(200).json(null)
        }
        
        // savedImage = await saveUserImage(user._id, filename, height, width)
        // console.log('savedImage', savedImage)
    }

    return res.json({ memory })
    
    // const user = await User
    //     .findOne({ _id: author })
    
    // let savedImage = null

    // if (image) {
    
    //     const { imageData, thumbData } = image

    //     if (imageData) {

    //         const { height, width } = imageData
            
    //         const filename = `${user._id}-${Date.now()}.png`
    //         const userDir = path.join(uploadDir, user.username)
            
    //         const uploadedImage = await handleFileUpload({ imageData, thumbData }, userDir, filename)
    //         console.log('uploadedImage', uploadedImage)
            
    //         if (!uploadedImage) {
    //             console.log('Error uploading post image/thumb.')
    //             return res.status(200).json(null)
    //         }
            
    //         savedImage = await saveUserImage(user._id, filename, height, width)
    //         console.log('savedImage', savedImage)
    //     }

    //     if (!savedImage.image) {
    //         console.log('Error saving user image/thumb.')
    //         // return res.status(200).json(null)
    //     }

    // }

    // let response = null

    // if (!_id) {
    //     // create a new mongo Post doc
    //     response = await Memory.create({ author, body, day, month, year, image: newUserImage?._id || null, title })
    // } else {
    //     response = await memory.save()

// const updatedPost = await Post.populate(post, {
//     path: 'author',
//     select: 'username profileImage',
//     populate: { path: 'profileImage' },
// })

        // const data = { body, day, month, year, threadId, title, image: savedImage?.image || null }
        // memory = await Memory.findOneAndUpdate(
        //     { _id: author },
        //     { $set: data },
        //     { new: true },
        // )
        // console.log('edited memory', response)
        // { author, body, day, month, year, image: savedImage?.image._id || null, title })
    // }

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

            // console.log('memory', memory)
        // return updated Entry document
}

module.exports = createMemory