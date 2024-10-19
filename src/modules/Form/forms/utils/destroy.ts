import axios from 'axios'

const destroy = async id => {
    const { data } = await axios.post('/api/unsubscribe', { id })
    if (!data) console.log('Error closing user account.')
    else return data
    return null
}

export default destroy