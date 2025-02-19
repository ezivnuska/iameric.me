import axios from 'axios'

const setAvatar = async (userId, imageId) => {
    
    const { data } = await axios.post('/api/user/avatar', { userId, imageId })

    if (data) return { profileImage: data.profileImage }
}

export default setAvatar