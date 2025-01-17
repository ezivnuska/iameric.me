import axios from 'axios'

const setAvatar = async (userId, imageId = null) => {
    
    const { data } = await axios.post('/api/user/avatar', { userId, imageId })
    
    if (data) return data.profileImage
    
    console.log('error setting image as avatar')

    return null
}

export default setAvatar