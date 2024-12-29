import axios from 'axios'

const loadContactIds = async () => {
    const { data } = await axios.get('/api/users/ids')
    if (!data || !data.users) console.log('Error: could not load users')
    else return data.users
    return null
}

export default loadContactIds