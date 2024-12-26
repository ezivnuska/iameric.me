import axios from 'axios'

const loadImage = async imageId => {
    const { data } = await axios.get(`/api/image/${imageId}`)
    if (data?.image) {
        return data.image
    }
    
    console.log('Error fetching user image.')

    return null
}

export default loadImage