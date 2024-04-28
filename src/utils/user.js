import axios from 'axios'

export const loadUser = async id => {
    const data = await axios.get(`/api/profile/${id}`)
    if (!data) console.log(`could not load user.`)
    else return data
    return null
}