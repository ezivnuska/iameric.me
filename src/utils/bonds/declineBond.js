import axios from 'axios'

const declineBond = async (bondId, userId) => {
    const { data } = await axios.post('/api/bond/decline', { bondId, userId })
    if (data && data.bond) return data.bond
    console.log('could not decline bond.')
    return null
}

export default declineBond