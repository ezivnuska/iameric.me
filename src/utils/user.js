import axios from 'axios'

export const loadProfileImage = async id => {
    const { data } = await axios.get(`/api/profile/image/${id}`)
    if (!data) console.log(`could not load profile image.`)
    else return data
    return null
}

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

export const addUserLocation = async location => {
    const { data } = await axios.post(`/api/location`, location)
    console.log('setUserLocation data:', data)
    if (!data) console.log('could not add user location data.')
    else return data.location
    return null
}