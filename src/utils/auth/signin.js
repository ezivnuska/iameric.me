import axios from 'axios'
import { setItem, storeToken } from '@utils/storage'

const signin = async (email, password) => {
    const { data } = await axios.post('/api/signin', { email, password })
    if (data && data.user) {

        await setItem('email', email)

        const { token } = data.user
        
        await storeToken(token)

        return data
        
    }
    
    console.log('Error: No data returned when authenticating user')
    return null
}

export default signin