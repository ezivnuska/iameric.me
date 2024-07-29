import axios from 'axios'

export default setUserLocation = async (latitude, longitude, userId) => {
    const { data } = await axios.post(`/api/location`, { latitude, longitude, userId })
    if (!data || !data.user) console.log('Error setting location')
    else return data.user
    return null
}