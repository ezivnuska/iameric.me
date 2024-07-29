import axios from 'axios'
import { GOOGLE_MAPS_API_KEY } from '../../../config'

export default getAddress = async coords => {
    const { lat, lng } = coords
    const latlng = `${lat},${lng}`
    console.log('latlng', latlng)
    const { data } = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${GOOGLE_MAPS_API_KEY}`)
    console.log('data', data)
    if (!data) console.log('Error setting location')
    else return data
    return null
}