import axios from 'axios'

const loadThread = async threadId => {
    const { data } = await axios.get(`/api/post/thread/${threadId}`)
    if (!data || !data.posts) console.log('could not load post thread.')
    else return data.posts
    return null
}

export default loadThread