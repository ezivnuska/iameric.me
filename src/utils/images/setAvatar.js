import axios from 'axios'

const setAvatar = async (userId, imageId = null) => {
    const { data } = await axios.post('/api/user/avatar', { imageId, userId })
    if (!data || !data.user) console.log('error setting image as avatar')
    else return data.user.profileImage
    return null
}

export default setAvatar