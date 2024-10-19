import axios from 'axios'

const uploadImage = async imageData => {
    console.log(`imageData:`, imageData)
    // expecting { userId, imageData, thumbData, avatar=null, location=null }
    const { data } = await axios.post(`/api/image/upload`, imageData)
    if (!data || !data.image) console.log('Error uploading image/thumb')
    else return data.image
    return null
}

export default uploadImage