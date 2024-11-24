import axios from 'axios'

const loadContact = async (username, images = false) => {
    const { data } = await axios.get(`/api/user/${username}?images=${images}`)
    if (!data || !data.user) console.log('Error fetching user by username')
    else return ({ ...data.user, images: data.images })
    return null
}

export default loadContact