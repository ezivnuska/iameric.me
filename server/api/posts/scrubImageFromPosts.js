const Post = require('../../models/Post')

const scrubImageFromPosts = async imageId => {

    let post = await Post.findOneAndUpdate(
        { image: imageId },
        { $set: { image: null } },
        { new: true }
    )
    
    post = await Post
        .findOne({ _id: post._id })
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
    
    return memory
}

module.exports = scrubImageFromPosts