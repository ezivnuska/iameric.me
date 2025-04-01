const Post = require('../../models/Post')

const createPost = async (req, res) => {
    console.log('create post', req.body)
    const { author, text, postId, threadId } = req.body

    let post

    if (postId) {
        post = await Post.findOneAndUpdate(
            { _id: postId },
            { $set: { text } },
            { new: true },
        )
    } else if (threadId) {
        post = await Post.create({ author, text, threadId })
    } else {
        post = await Post.create({ author, text })
    }

    if (post) {
        post = await Post
            .findOne({ _id: post._id })
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
    
    return res.status(200).json(null)
    
}

module.exports = createPost