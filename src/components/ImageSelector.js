import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
    Preview,
    ThemedText,
} from '.'
import EXIF from 'exif-js'
import {
    useApp,
    useImages,
    useModal,
    useUser,
} from '@context'
import { handleImageData, openFileSelector, uploadImageData } from '@utils/images'

const initialSize = 280

export default () => {

    const { dims } = useApp()
    const {
        addImage,
        setUploading,
        uploading,
    } = useImages()
    const {
        closeModal,
    } = useModal()
    const {
        profile,
    } = useUser()

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)

    useEffect(() => {
        const init = async () => {
            setUploading(true)
            await openSelector(profile._id)
        }
        init()
    }, [])
    
    const openSelector = async id => {
        const uri = await openFileSelector()
        if (uri) {
            handleSelectedImage(uri, id)
        }
    }
    
    useEffect(() => {
        const dropzone = document.getElementById('dropzone')
        if (dropzone) {
            const maxWidth = size
            const actualWidth = dropzone.offsetWidth
            const width = actualWidth > maxWidth ? maxWidth : actualWidth
            setSize(width)
        }
    }, [dims])

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleSelectedImage = async (uri, id) => {
        const blob = await dataURItoBlob(uri)
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif, id)
        }
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif, id) => {
        const image = new Image()
        image.onload = async () => {
            const data = await handleImageData(image, exif, id)
            setUploading(false)
            if (!data) console.log('error loading image')
            else setPayload(data)
        }
        image.src = src
    }

    useEffect(() => {
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        } else if (preview) {
            setPreview(null)
            closeModal()
        }
    }, [payload])

    const handleUpload = async imageData => {
        if (process.env.NODE_ENV === 'development') return alert('cant upload in dev')
        
        setUploading(true)
        const image = await uploadImageData(imageData)
        setUploading(false)
        
        if (!image) console.log('error uploading image')
        else addImage(image)

        closeModal()
    }

    const onSubmit = async () => {
        if (!payload) console.log('no image data to submit.')
        else {
            const { imageData, thumbData, userId } = payload
            handleUpload({ imageData, thumbData, userId })
            setPayload(null)
        }
    }

    return (
        <View
            id='dropzone'
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            {preview ? (
                <View
                    style={{
                        marginBottom: 15,
                    }}
                >
                    <Preview
                        width={preview.width}
                        height={preview.height}
                        uri={preview.uri}
                    />
                </View>
            ) : null}
            
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    width: size,
                }}
            >
                {preview ? (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: size,
                        }}
                    >
                        <IconButton
                            type='primary'
                            label='Upload Image'
                            disabled={uploading}
                            onPress={onSubmit}
                        />

                        <IconButton
                            label='Change Image'
                            disabled={uploading}
                            onPress={openSelector}
                        />

                    </View>

                ) : (
                    <IconButton
                        type='primary'
                        label='Select Image'
                        disabled={uploading}
                        onPress={openSelector}
                    />
                )}

            </View>
        </View>
    )
}