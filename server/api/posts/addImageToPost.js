const Post = require('../../models/Post')

const createPost = async (req, res) => {
    
    // pull values from request body
    const { postId, imageId } = req.body

    const post = await Post.findOne({ _id: postId })

    post.images = [...post.images, imageId]

    await post.save({ isNew: false })

    const updatedPost = await Post.populate(post, {
        path: 'author',
        select: 'username profileImage',
        populate: { path: 'profileImage' },
    })

    // return updated Entry document

    if (updatedPost) return res.json({ post: updatedPost })
    
    console.log('Problem adding image to post.')

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createPost