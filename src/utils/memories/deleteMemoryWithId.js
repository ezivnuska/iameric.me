import axios from 'axios'

const deleteMemoryWithId = async id => {
    const { data } = await axios.delete(`/api/memory/delete/${id}`)
    if (data && data.memory) return data.memory
    
    console.log('Error deleting memory') 
    return null
}

export default deleteMemoryWithId