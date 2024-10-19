import axios from 'axios'

const loadBipImages = async id => {
    const { data } = await axios.get(`/api/bip/images/${id}`)
    if (!data || !data.images) console.log('could not load bip images.')
    else return data.images
    return null
}

export default loadBipImages