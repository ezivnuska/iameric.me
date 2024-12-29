import axios from 'axios'

const loadContact = async username => {
    const { data } = await axios.get(`/api/username/${username}`)
    if (!data || !data.user) console.log('Error fetching user by username')
    else return data.user

    return null
}

export default loadContact