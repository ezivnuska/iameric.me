import axios from 'axios'

const loadMemories = async () => {
    const { data } = await axios.get('/api/memories')
    // console.log('loadMemories:', data)
    if (data && data.memories) return data.memories
    
    console.log('could not load memories.')
    return null
}

export default loadMemories