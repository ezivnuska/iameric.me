import axios from 'axios'
import { GEOCODING_API_KEY } from '@config'

export default getAddress = async coords => {
    const apiKey = process.env.GEOCODING_API_KEY || GEOCODING_API_KEY
    // console.log('GeocodingApiKey', apiKey)
    const { lat, lng } = coords
    const latlng = `${lat},${lng}`
    const { data } = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?v=beta&latlng=${latlng}&key=${apiKey}`)
    if (!data) console.log(`Error getting address from coords, ${latlng}`)
    else return data
    return null
}