import axios from 'axios'

const deleteBond = async bondId => {
    const { data } = await axios.post('/api/bond/delete', { bondId })
    if (data && data.bond) return data.bond
    console.log('could not delete bond.')
    return null
}

export default deleteBond