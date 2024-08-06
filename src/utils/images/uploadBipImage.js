import axios from 'axios'

export default uploadBipImage = async (bipId, image) => {
    // expecting { userId, imageData, thumbData, avatar=null, location=null }
    const { data } = await axios.post(
        `/api/bip/image/upload`, {
            bipId,
            ...image,
        }
    )

    if (!data) console.log('Error uploading image/thumb')
    else return data
    return null
}