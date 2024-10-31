import axios from 'axios'

const loadPosts = async () => {
    const { data } = await axios.get('/api/posts')
    if (!data || !data.posts) console.log('could not load posts.')
    else return data.posts
    return null
}

export default loadPosts