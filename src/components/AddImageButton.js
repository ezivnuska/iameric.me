import React from 'react'
import { IconButton } from 'react-native-paper'
import { useUser } from '@context'
import {
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import EXIF from 'exif-js'

const AddImageButton = ({ data, onSelection, onUploaded }) => {
    
    const { user } = useUser()

    const handleUpload = async payload => {

        const { uri, height, width } = payload.imageData
        onSelection({ uri, height, width })

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const uploadedImage = await uploadImage(payload)

        if (uploadedImage) {
            onUploaded(uploadedImage)
        }
    }

    const openSelector = async () => {
        const uri = await openFileSelector()
        
        if (uri) {
            handleSelectedImage(uri)
        } else {
            console.log('no selection made')
        }
    }

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleSelectedImage = async uri => {

        const blob = await dataURItoBlob(uri)
        
        const reader = new FileReader()
        
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif, user._id)
        }

        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif, id) => {
        
        const image = new Image()
        
        image.onload = async () => {
            const imageResult = await handleImageData(id, image, exif)
            
            if (imageResult) {
                handleUpload(imageResult)
            }
        }

        image.src = src
    }

    return (
        <IconButton
            icon='file-image-plus'
            onPress={openSelector}
        />
    )
}

export default AddImageButton