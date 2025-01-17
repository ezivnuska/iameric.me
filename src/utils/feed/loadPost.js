import axios from 'axios'

const loadPost = async postId => {
    const { data } = await axios.get(`/api/post/${postId}`)
    if (!data || !data.post) console.log('could not load post.')
    else return data.post
    return null
}

export default loadPost