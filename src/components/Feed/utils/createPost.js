import axios from 'axios'

const createPost = async post => {
    const { data } = await axios.post('/api/post', post)
    if (!data || !data.post) console.log('could not create new post.')
    else return data.post
    return null
}

export default createPost