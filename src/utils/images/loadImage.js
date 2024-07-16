import axios from 'axios'

export default loadImage = async imageId => {
    const { data } = await axios.get(`/api/image/${imageId}`)
    if (!data) console.log('Error fetching user image.')
    else return data
    return null
}