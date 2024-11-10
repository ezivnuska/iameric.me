import axios from 'axios'

const loadBips = async () => {
    const { data } = await axios.get('/api/bips')
    if (!data || !data.bips) console.log('could not load bips.')
    else return data.bips
    return null
}

export default loadBips