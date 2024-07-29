import axios from 'axios'

export default loadThread = async threadId => {
    const { data } = await axios.get(`/api/thread/${threadId}`)
    if (!data || !data.entries) console.log('could not load entries.')
    else return data.entries
    return null
}