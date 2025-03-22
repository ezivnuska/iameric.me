import axios from 'axios'

const confirmBond = async (bondId, userId) => {
    const { data } = await axios.post('/api/bond/confirm', { bondId, userId })
    if (data && data.bond) return data.bond
    console.log('could not confirm bond.')
    return null
}

export default confirmBond