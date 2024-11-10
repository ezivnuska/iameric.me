import axios from 'axios'

const getBipImages = async bipId => {
    const { data } = await axios.get(`/api/bip/images/${bipId}`)
    if (!data || !data.images) console.log('Error fetching bip images.')
    else return data.images
    return null
}

export default getBipImages