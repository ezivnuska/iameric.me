import axios from 'axios'

const deletePostWithId = async id => {
    const { data } = await axios.delete(`/api/post/delete/${id}`)
    if (!data || !data.post) console.log('Error deleting post')
    else return data.post
    return null
}

export default deletePostWithId