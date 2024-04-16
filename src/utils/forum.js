import axios from 'axios'

/**
 * 
 * @returns array of entry objects
 */

export const loadEntries = async () => {

    const { data } = await axios.get('/api/entries')

    if (data && data.entries) return data.entries
    
    console.log('could not load entries.')
    return null
}

export const deleteEntryWithId = async id => {
    
    const { data } = await axios.delete(`/api/entry/delete/${id}`)

    if (!data.entry) {
        console.log('Error deleting product')
        return null
    }

    return data.entry
}