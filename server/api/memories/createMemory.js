const Memory = require('../../models/Memory')
const User = require('../../models/User')
const handleFileUpload = require('../upload/handleFileUpload')
const saveUserImage = require('../upload/saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const createMemory = async (req, res) => {
    
    const { _id, author, body, day, month, year, threadId, title } = req.body
    
    let memory

    if (_id) {
        memory = await Memory.findOneAndUpdate(
            { _id },
            { $set: { body, day, month, year, title } },
            { new: true },
        )
    } else {
        memory = await Memory.create({ author, body, day, month, year, title })
    }

    if (!memory) {
        console.log('Could not find or create memory.')
        return res.status(200).json(null)
    }

    const newMemory = await Memory
        .populate(memory, [
            {
                path: 'author',
                select: '_id username profileImage',
                populate: {
                    path: 'profileImage',
                    select: '_id filename',
                },
            },
            {
                path: 'image',
                select: 'filename height width',
            }
        ])

    return res.json({ memory: newMemory })
}

module.exports = createMemory