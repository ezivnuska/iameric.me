import axios from 'axios'

const loadContacts = async () => {
    const { data } = await axios.get('/api/users')
    if (!data || !data.users) console.log('Error: could not load users')
    else return data.users
    return null
}

export default loadContacts