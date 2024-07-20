import axios from 'axios'

export default loadImages = async userId => {
    const { data } = await axios.get(`/api/user/images/${userId}`)
    if (!data || !data.images) console.log('Error fetching user images.')
    else return data.images
    return null
}