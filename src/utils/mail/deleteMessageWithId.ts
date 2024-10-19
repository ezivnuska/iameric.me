import axios from 'axios'

const deleteMessageWithId = async id => {
    const { data } = await axios.delete(`/api/message/delete/${id}`)
    if (!data.message) console.log('Error deleting message')
    else return data.message
    return null
}

export default deleteMessageWithId