import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useMemory, useModal, useUser } from '@context'
import { handleImageData, openFileSelector, uploadImage } from '@utils/images'
import { addMemoryImage } from '@utils/memories'
import EXIF from 'exif-js'

const MemoryImageSelector = ({ data }) => {
    
    const { updateMemory } = useMemory()
    const { clearModals, closeModal } = useModal()
    const { user } = useUser()

    const [payload, setPayload] = useState(null)

    useEffect(() => {
        openSelector()
    }, [])

    useEffect(() => {
    
        if (payload) {

            const { uri, height, width } = payload.imageData

            updateMemory({
                _id: data._id,
                image: { uri, height, width },
            })
            
            handleUpload(payload)
            
            setPayload(null)
            
            closeModal()
        }
    }, [payload])

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
                setPayload(imageResult)
            }
            
        }

        image.src = src
    }

    const handleUpload = async imagePayload => {

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const image = await uploadImage(imagePayload)

        const { imageData, thumbData } = imagePayload

        if (image) {
            const memoryWithImage = await addMemoryImage(data._id, { imageData, thumbData })
            
            if (memoryWithImage) {
                updateMemory(memoryWithImage)
            }
        }
        
        closeModal()
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 20,
            }}
        >

            <Button
                mode='contained'
                onPress={openSelector}
            >
                Select Image
            </Button>

            <Button
                mode='text'
                onPress={clearModals}
            >
                Cancel
            </Button>

        </View>
    )
}

export default MemoryImageSelector