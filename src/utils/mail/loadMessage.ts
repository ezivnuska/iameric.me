import axios from 'axios'

const loadMessage = async id => {
    const { data } = await axios.get(`/api/message/${id}`)
    if (!data || !data.message) console.log('could not load message.')
    else return data.message
    return null
}

export default loadMessage