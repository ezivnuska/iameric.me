import axios from 'axios'

const loadEntries = async () => {
    const { data } = await axios.get('/api/entries')
    if (!data || !data.entries) console.log('could not load entries.')
    else return data.entries
    return null
}

export default loadEntries