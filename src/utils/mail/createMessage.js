import axios from 'axios'

const createMessage = async message => {
    const { data } = await axios.post('/api/message', message)
    if (!data || !data.message) console.log('could not create new message.')
    else return data.message
    return null
}

export default createMessage