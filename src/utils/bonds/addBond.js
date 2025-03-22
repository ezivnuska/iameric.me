import axios from 'axios'

const addBond = async (responderId, userId) => {
    const { data } = await axios.post('/api/bond/create', { responderId, userId })
    if (data && data.bond) return data.bond
    console.log('could not create new bond.')
    return null
}

export default addBond