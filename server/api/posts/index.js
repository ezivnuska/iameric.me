const createPost = require('./createPost')
const deleteAllPostsByUserId = require('./deleteAllPostsByUserId')
const deletePostById = require('./deletePostById')
const getPost = require('./getPost')
const getPosts = require('./getPosts')
const getPostThread = require('./getPostThread')

module.exports = {
    createPost,
    deleteAllPostsByUserId,
    deletePostById,
    getPost,
    getPosts,
    getPostThread,
}