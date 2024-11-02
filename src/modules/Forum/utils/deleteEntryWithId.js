import axios from 'axios'

const deleteEntryWithId = async id => {
    const { data } = await axios.delete(`/api/entry/delete/${id}`)
    if (!data.entry) console.log('Error deleting product')
    else return data.entry
    return null
}

export default deleteEntryWithId