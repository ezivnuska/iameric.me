import axios from 'axios'

const loadImages = async userId => {
    const { data } = await axios.get(`/api/user/images/${userId}`)
    if (!data || !data.images) console.log('Error fetching user images.')
    else return data.images
    return null
}

export default loadImages