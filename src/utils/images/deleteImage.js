import axios from 'axios'

const deleteImage = async imageId => {
    const { data } = await axios.post('/api/images/delete', { imageId })
    
    if (data) return data
    
    console.log('error deleting image.')
    return null
}

export default deleteImage