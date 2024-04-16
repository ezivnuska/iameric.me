import axios from 'axios'

/**
 * 
 * @param id
 * @returns 
 */

export const getUserLocation = async userId => {

    const { data } = await axios.get(`/api/location/${userId}`)

    if (!data || !data.location) {
        console.log('could not get user location data.')
        return null
    }
    
    return data
}

export const getContactLocation = async userId => {

    const { data } = await axios.get(`/api/location/${userId}`)

    if (!data || !data.location) {
        console.log('could not get contact location data.')
        return null
    }
    
    return data
}