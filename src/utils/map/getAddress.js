import axios from 'axios'
import { GEOCODING_API_KEY } from '@config'

export default getAddress = async coords => {
    const apiKey = process.env.GEOCODING_API_KEY || GEOCODING_API_KEY
    // console.log('GeocodingApiKey', apiKey)
    const { lat, lng } = coords
    const latlng = `${lat},${lng}`
    const { data } = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?v=beta&latlng=${latlng}&key=${apiKey}`)
    if (!data) console.log(`Error getting address from coords, ${latlng}`)
    else {
        const address = data.results[0]
        if (address) {
            let streetNumber = null
            let streetName = null
            let cityName = null
            const { address_components } = address
            address_components.map(comp => {
                if (comp.types.indexOf('street_number') > -1) {
                    streetNumber = comp.short_name
                } else if (comp.types.indexOf('route') > -1) {
                    streetName = comp.short_name
                } else if (comp.types.indexOf('locality') > -1) {
                    cityName = comp.short_name
                }
            })
            return {
                streetNumber,
                streetName,
                cityName,
                coords,
            }
        }
    }
    // else return data
    return null
}