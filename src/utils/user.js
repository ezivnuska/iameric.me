import axios from 'axios'

/**
 * 
 * user
 *  
 */

export const loadUser = async token => {
    const { data } = await axios.get(`/api/user/${token}`)
    if (!data) console.log(`could not load user.`)
    else return data
    return null
}