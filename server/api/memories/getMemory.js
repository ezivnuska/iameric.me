const Memory = require('../../models/Memory')

const getMemory = async (req, res) => {

    const memory = await Memory
        .findById(req.params.memoryId)
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: {
                path: 'profileImage',
                select: 'filename',
            }
        })
        .populate({
            path: 'image',
        })
    // console.log('getMemory', memory)
    if (memory) return res.status(200).json({ memory })
    
    console.log('error fetching memory.')

    return res.status(200).json(null)
}

module.exports = getMemory