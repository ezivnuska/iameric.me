const Post = require('../../models/Post')

const deleteAllPostsByUserId = async user => {
    console.log(`deleting Posts for user id ${user._id}`)
    const { deleteCount } = await Post.deleteMany({ user })

    if (!deleteCount) console.log('No Posts were deleted.')
    else console.log(`deleted ${deleteCount} ${deleteCount !== 1 ? 'Posts' : 'Post'}`)

    return deleteCount || 0
}

module.exports = deleteAllPostsByUserId