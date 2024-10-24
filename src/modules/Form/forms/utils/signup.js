import axios from 'axios'

const signup = async (email, password, username, fiction) => {
    const { data } = await axios.post('/api/signup', { email, password, username, fiction })
    if (!data || !data.user) console.log('Error authenticating user')
    else return data.user
    return null
}

export default signup