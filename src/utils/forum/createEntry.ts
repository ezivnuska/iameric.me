import axios from 'axios'

export default createEntry = async entry => {
    const { data } = await axios.post('/api/entry', entry)
    if (!data || !data.entry) console.log('could not create new entry.')
    else return data.entry
    return null
}