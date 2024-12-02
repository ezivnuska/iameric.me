import axios from 'axios'

const fetchContactAndImageIds = async username => {
    const { data } = await axios.get(`/api/user/${username}/images`)
    if (!data) {
        console.log('Error fetching contact and image count by username:', username)
    } else {
        const { user, images } = data
        if (!user) console.log('Error fetching contact and image count by username:', username)
        else return ({ ...user, images })
    }
    return null
}

export default fetchContactAndImageIds