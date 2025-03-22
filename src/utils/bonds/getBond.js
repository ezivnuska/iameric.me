import axios from 'axios'

const getBond = async (user1, user2) => {
    const { data } = await axios.post('/api/bond', { user1, user2 })
    if (data && data.bond) return data.bond
    console.log('could not find bond.')
    return null
}

export default getBond