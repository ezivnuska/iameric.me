import axios from 'axios'

export default deleteImage = async (imageId, isProductImage = null, isProfileImage = null) => {
    const { data } = await axios.post('/api/images/delete', {
        imageId,
        isProductImage,
        isProfileImage,
    })
    
    if (!data || !data.deletedImage) console.log('error deleting image.')
    else return data.deletedImage
    return null
}