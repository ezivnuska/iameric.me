import axios from 'axios'

const loadImage = async imageId => {
    const { data } = await axios.get(`/api/image/${imageId}`)
    if (!data || !data.image) console.log('Error fetching user image.')
    else return data.image
    return null
}

export default loadImage