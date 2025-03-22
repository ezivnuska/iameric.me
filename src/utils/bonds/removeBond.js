import axios from 'axios'

const removeBond = async (bondId, userId) => {
    const { data } = await axios.post('/api/bond/remove', { bondId, userId })
    if (data && data.bond) return data.bond
    console.log('could not remove bond.')
    return null
}

export default removeBond