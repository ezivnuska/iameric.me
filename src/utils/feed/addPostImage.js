import axios from 'axios'

const addPostImage = async (postId, imageId) => {
    
    const { data } = await axios.post('/api/post/image', { postId, imageId })
    if (data && data.post) return data.post

    console.log('could not add image to post.')
    return null
}

export default addPostImage