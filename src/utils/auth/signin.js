import axios from 'axios'
import { setItem, storeToken } from '@utils/storage'

const signin = async (email, password) => {

    const { data } = await axios.post('/api/signin', { email, password })

    const { error, user, name, message } = data

    if (user) {

        await setItem('email', email)

        const { token } = user
        
        await storeToken(token)
        
    } else if (error) {

        console.log('Error authenticating user.', name, message)
    }
    
    return data
}

export default signin