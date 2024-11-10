import axios from 'axios'

const loadBip = async id => {
    const { data } = await axios.get(`/api/bips/${id}`)
    if (!data || !data.bip) console.log('could not load bip.')
    else return data.bip
    return null
}

export default loadBip