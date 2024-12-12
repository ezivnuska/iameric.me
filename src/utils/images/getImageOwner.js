import axios from 'axios'

const getImageOwner = async imageId => {
    const { data } = await axios.get(`/api/image/owner/${imageId}`)
    if (!data || !data.user) console.log('Error fetching image owner.')
    else return data.user
    return null
}

export default getImageOwner