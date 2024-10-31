const Post = require('../../models/Post')

const createPost = async (req, res) => {
    
    // pull values from request body
    const { author, text, threadId } = req.body

    // create a new mongo Post doc
    const newPost = await Post.create({ author, text })

    // if error, notify console
    if (!newPost) console.log('Problem creating Post.')
    else {
        if (threadId) {
            newPost.threadId = threadId
            await newPost.save()
        }
        // fetch new (populated) Entry
        const post = await Post
            .findOne({ _id: newPost._id })
            .populate({
                path: 'author',
                select: 'username profileImage',
                populate: { path: 'profileImage' },
            })
            // return updated Entry document
            return res.json({ post })
    }

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createPost