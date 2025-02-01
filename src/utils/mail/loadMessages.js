import axios from 'axios'

const loadMessages = async userId => {
    const { data } = await axios.get(`/api/messages/${userId}`)
    if (!data || !data.messages) console.log('could not load messages.')
    else return data.messages
    return null
}

export default loadMessages