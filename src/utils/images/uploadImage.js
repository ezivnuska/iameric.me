import axios from 'axios'
import { FileSystemUploadType } from 'expo-file-system'

const uploadImage = async imageData => {
    
    /**
     * expecting object with properties:
     *  userId (string),
     *  imageData (object),
     *  thumbData (object),
     *  avatar (boolean, optional),
     *  location (object, optional, not currently in use),
     */

    const { data } = await axios.post(`/api/image/upload`, imageData, {
        uploadType: FileSystemUploadType.MULTIPART,
    })

    if (data && data.image) return data.image
    
    console.log('Error uploading image/thumb')
    
    return null
}

export default uploadImage