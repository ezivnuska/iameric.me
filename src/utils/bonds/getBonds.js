import axios from 'axios'

const getBonds = async (userId) => {
    const { data } = await axios.get(`/api/bonds/${userId}`)
    if (data && data.bonds) return data.bonds
    console.log('could not load bonds.')
    return null
}

export default getBonds