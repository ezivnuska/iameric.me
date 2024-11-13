import axios from 'axios'

const signin = async (email, password) => {
    const { data } = await axios.post('/api/signin', { email, password })
    
    if (!data) {
        console.log('Error: No data returned when authenticating user')
    } else if (data.error) {
        const { error, invalidField, msg } = data
        console.log('Error:', msg)
        return { error, name: invalidField, message: msg }
    }
    return data
}

export default signin