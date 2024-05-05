import axios from 'axios'

/**
 * 
 * @returns array of entry objects
 */

export const loadEntries = async () => {
    const { data } = await axios.get('/api/entries')
    if (!data || !data.entries) console.log('could not load entries.')
    else return data.entries
    return null
}

export const createEntry = async entry => {
    const { data } = await axios.post('/api/entry', entry)
    if (!data || !data.entry) console.log('could not create new entry.')
    else return data.entry
    return null
}

export const deleteEntryWithId = async id => {
    const { data } = await axios.delete(`/api/entry/delete/${id}`)
    if (!data.entry) console.log('Error deleting product')
    else return data.entry
    return null

}