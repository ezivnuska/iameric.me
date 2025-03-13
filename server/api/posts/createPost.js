const Post = require('../../models/Post')

const createPost = async (req, res) => {
    
    const { author, text, postId, threadId } = req.body

    let post

    if (postId) {
        post = await Post.findOneAndUpdate(
            { _id: postId },
            { $set: { text } },
            { new: true },
        )
    } else {
        post = await Post.create({ author, text, threadId })
    }

    if (post) {
        post = await Post
            .findOne({ _id: postId })
            .populate({
                path: 'author',
                select: 'username profileImage',
                populate: {
                    path: 'profileImage',
                    select: 'filename width height',
                },
            })
            .populate({
                path: 'image',
                select: 'filename width height',
            })

        return res.status(200).json({ post })
    }

    console.log('Problem creating Post.')

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createPost