import axios from 'axios'

export default setImageAsAvatar = async (imageId, userId) => {
    const { data } = await axios.post('/api/user/avatar', { imageId, userId })
    if (!data) console.log('error setting image as avatar')
    else return data
    return null
}