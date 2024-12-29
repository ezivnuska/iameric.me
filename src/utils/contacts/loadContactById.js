import axios from 'axios'

const loadContactById = async id => {
    const { data } = await axios.get(`/api/user/${id}`)
    if (!data || !data.user) console.log('Error fetching user by id')
    else return data.user
    return null
}

export default loadContactById