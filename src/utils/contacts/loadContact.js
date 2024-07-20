import axios from 'axios'

export default loadContact = async username => {
    const { data } = await axios.get(`/api/user/${username}`)
    if (!data || !data.user) console.log('Error fetching user by username')
    else return data.user
    return null
}