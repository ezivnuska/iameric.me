import axios from 'axios'

export default deleteMessageWithId = async id => {
    const { data } = await axios.delete(`/api/message/delete/${id}`)
    if (!data.message) console.log('Error deleting message')
    else return data.message
    return null
}