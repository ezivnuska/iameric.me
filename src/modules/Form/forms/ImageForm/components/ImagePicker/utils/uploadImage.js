import axios from 'axios'

export default uploadImage = async imageData => {
    const { data } = await axios.post(`/api/image/upload`, imageData)
    if (!data || !data.image) console.log('Error uploading image/thumb')
    else return data.image
    return null
}