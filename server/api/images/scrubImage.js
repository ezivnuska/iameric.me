const scrubImageFromMemories = require('../memories/scrubImageFromMemories')
const scrubImageFromPosts = require('../posts/scrubImageFromPosts')

const scrubImage = async imageId => {

    let deletedImage = await scrubImageFromMemories(imageId)
    deletedImage = await scrubImageFromPosts(imageId)
    
    return deletedImage
}

module.exports = scrubImage