import axios from 'axios'

const deleteBip = async id => {
    const { data } = await axios.post(`/api/bip/delete`, { id })
    if (!data || !data.bip) console.log('Error deleting bip')
    else return data.bip
    return null
}

export default deleteBip