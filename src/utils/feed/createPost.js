import axios from 'axios'

const createPost = async post => {
    const { data } = await axios.post('/api/post', post)
    if (data && data.post) return data.post
    console.log('could not create new post.')
    return null
}

export default createPost