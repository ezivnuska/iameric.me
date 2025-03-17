import axios from 'axios'

const removeMemoryImage = async memoryId => {
    
    const { data } = await axios.post('/api/memory/image/delete', { memoryId })
    
    if (data && data.memory) return data.memory

    console.log('could not remove image from memory.')
    return null
}

export default removeMemoryImage