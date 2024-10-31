import axios from 'axios'

const signin = async (email, password) => {
    const { data } = await axios.post('/api/signin', { email, password })
    if (!data || !data.user) console.log('Error: No data returned when authenticating user')
    else return data.user
    return null
}

export default signin