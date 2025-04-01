const Post = require('../../models/Post')

const deletePostById = async (req, res) => {
    
    let post = await Post
        .findById(req.params.id)
    
    if (!post) {
        console.log('error deleting Post.')
        return res.status(200).json(null)
    }
    
    const threadId = post.threadId
    
    post = await Post
        .findByIdAndDelete(req.params.id)
        
    console.log('post deleted', post.text)

    if (!threadId) {
        const deleted = await Post
            .deleteMany({ threadId: req.params.id })
        
        console.log('comments deleted', deleted.deletedCount)
    }

    return res.status(200).json({ post })
}

module.exports = deletePostById