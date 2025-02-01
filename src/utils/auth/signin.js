import axios from 'axios'

const signin = async (email, password) => {
    const { data } = await axios.post('/api/signin', { email, password })
    if (data) return data
    
    console.log('Error: No data returned when authenticating user')
    return null
}

export default signin