import axios from 'axios'

export default getBipImages = async bipId => {
    const { data } = await axios.get(`/api/bip/images/${bipId}`)
    if (!data || !data.images) console.log('Error fetching bip images.')
    else return data.images
    return null
}