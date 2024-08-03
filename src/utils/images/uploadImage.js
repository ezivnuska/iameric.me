import axios from 'axios'

export default uploadImage = async imageData => {
    console.log('uploadImage:imageData (is avatar in data?)', imageData)
    const { data } = await axios.post(`/api/image/upload`, imageData)
    if (!data || !data.image) console.log('Error uploading image/thumb')
    else return data.image
    return null
}