import axios from 'axios'

const cancelBond = async (bondId, userId) => {
    const { data } = await axios.post('/api/bond/cancel', { bondId, userId })
    if (data && data.bond) return data.bond
    console.log('could not cancel bond.')
    return null
}

export default cancelBond