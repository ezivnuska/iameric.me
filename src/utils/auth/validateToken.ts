import axios from 'axios'

export default validateToken = async token => {
    const { data } = await axios.get(`/api/token/${token}`)
    if (!data) console.log('error validating token')
    else {
        const expired = (new Date(data.exp) - Date.now() > 0)
        if (expired) console.log('token expired')
        else return data
    }
    return null
}