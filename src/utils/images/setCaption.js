import axios from 'axios'

const setCaption = async (id, text) => {
    const { data } = await axios.post('/api/user/image/caption', { id, text })
    if (!data || !data.image) console.log('error setting image caption')
    else return data.image
    return null
}

export default setCaption