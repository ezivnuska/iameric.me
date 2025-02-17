import axios from 'axios'

const addMemoryImage = async (memoryId, image) => {
    
    const { data } = await axios.post('/api/memory/image', { memoryId, image })
    if (data && data.memory) return data.memory

    console.log('could not add image to memory.')
    return null
}

export default addMemoryImage