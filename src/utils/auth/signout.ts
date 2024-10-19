import axios from 'axios'

const signout = async id => {
    const { data } = await axios.get(`/api/signout/${id}`)
    if (!data) console.log('could not sign out user')
    else return data
    return null
}

export default signout