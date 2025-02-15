import axios from 'axios'

const loadMemory = async memoryId => {
    const { data } = await axios.get(`/api/memory/${memoryId}`)
    if (data && data.memory) return data.memory
    
    console.log('could not load memory.')
    return null
}

export default loadMemory