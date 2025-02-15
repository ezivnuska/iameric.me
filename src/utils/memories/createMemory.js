import axios from 'axios'

const createMemory = async memory => {
    const { data } = await axios.post('/api/memory', memory)
    console.log('data', data)
    if (data && data.memory) return data.memory
    console.log('could not create new memory.')
    return null
}

export default createMemory