import axios from 'axios'

export default loadMessages = async () => {
    console.log('loading messages')
    const { data } = await axios.get('/api/messages')
    if (!data || !data.messages) console.log('could not load messages.')
    else return data.messages
    return null
}