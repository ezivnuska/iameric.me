import axios from 'axios'

const removePostImage = async postId => {
    
    const { data } = await axios.post('/api/post/image/delete', { postId })
    
    if (data && data.post) return data.post

    console.log('could not remove image to post.')
    return null
}

export default removePostImage