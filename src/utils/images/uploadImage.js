import axios from 'axios'
import { FileSystemUploadType } from 'expo-file-system'

const uploadImage = async (imageData, onProgress = null) => {
    console.log('imageData', imageData)
    // expecting { userId, imageData, thumbData, avatar=null, location=null }
    const { data } = await axios.post(`/api/image/upload`, imageData, {
        // headers: {
        //     // 'x-ms-blob-type': 'BlockBlob',
        //     'Content-Type': 'multipart/form-data',
        // },
        uploadType: FileSystemUploadType.MULTIPART,
        // onUploadProgress: (event) => {
        //     // console.log('length computable', event.lengthComputable)
        //     // if (event.lengthComputable) {
        //     //     const progress = Math.round((event.loaded / event.total) * 100)
        //     //     console.log(`Upload Progress: ${event.loaded}/${event.total}`)
        //         onProgress(event)
        //     // }
        // },
    }
    //     {
    //     onUploadProgress: progressEvent => {
    //         console.log(`ProgressEvent Loaded: ${progressEvent.loaded}%`)
    //         console.log(`ProgressEvent Total: ${progressEvent.total}%`)
    //         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         console.log(`Upload Progress: ${progress}%`)
    //         onProgress(progress)
    //     }
    // }
    )

    if (data && data.image) return data.image
    
    console.log('Error uploading image/thumb')
    return null
}

export default uploadImage