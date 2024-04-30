import axios from 'axios'

export const loadUser = async id => {
    const { data } = await axios.get(`/api/profile/${id}`)
    if (!data) console.log(`could not load user.`)
    else return data
    return null
}

export const getUserLocation = async userId => {
    const { data } = await axios.get(`/api/location/${userId}`)
    console.log('user location data:', data)
    if (!data) console.log('could not get user location data.')
    else return data.location
    return null
}