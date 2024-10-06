import axios from 'axios'

export default loadBips = async () => {
    const { data } = await axios.get('/api/bips')
    if (!data || !data.bips) console.log('could not load bips.')
    else return data.bips
    return null
}