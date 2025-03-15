const addPostImage = require('./addPostImage')
const createPost = require('./createPost')
const deleteAllPostsByUserId = require('./deleteAllPostsByUserId')
const deletePostById = require('./deletePostById')
const getPost = require('./getPost')
const getPosts = require('./getPosts')
const getPostThread = require('./getPostThread')
const removePostImage = require('./removePostImage')
const scrubImageFromPosts = require('./scrubImageFromPosts')

module.exports = {
    addPostImage,
    createPost,
    deleteAllPostsByUserId,
    deletePostById,
    getPost,
    getPosts,
    getPostThread,
    removePostImage,
    scrubImageFromPosts,
}