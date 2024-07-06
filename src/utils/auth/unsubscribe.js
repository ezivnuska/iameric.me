import axios from 'axios'

export default unsubscribe = async id => {
    const { data } = await axios.post('/api/unsubscribe', { id })
    if (!data) console.log('Error closing user account.')
    else return data
    return null
}