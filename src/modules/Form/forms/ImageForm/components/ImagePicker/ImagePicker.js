import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    ImageClone,
    SimpleButton,
} from '@components'
import EXIF from 'exif-js'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useImages } from '@images'
import {
    handleImageData,
    openFileSelector,
    uploadImage,
} from './utils'

const initialSize = 280

export default ImagePicker = () => {

    const {
        dims,
        user,
    } = useApp()

    const {
        addImage,
        setUploading,
        uploading,
    } = useImages()

    const {
        // closeModal,
    } = useModal()

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)

    useEffect(() => {
        const init = async () => {
            // setUploading(true)
            await openSelector(user._id)
        }
        init()
    }, [])
    
    const openSelector = async id => {
        const uri = await openFileSelector()
        if (uri) {
            // console.log('image selected', uri)
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
            const data = await handleImageData(id, image, exif)
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
            // closeModal()
        }
    }, [payload])

    const handleUpload = async imageData => {
        if (process.env.NODE_ENV === 'development') return alert('cant upload in dev')
        
        setUploading(true)
        const image = await uploadImage(imageData)
        setUploading(false)
        
        if (!image) console.log('error uploading image')
        else addImage(image)

        // closeModal()
    }

    const onSubmit = async () => {
        if (!payload) console.log('no image data to submit.')
        else {
            const { imageData, thumbData, userId } = payload
            // handleUpload({ imageData, thumbData, userId })
            console.log('submitting', payload)
            setPayload(null)
        }
    }

    return (
        <View>
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
                        <ImageClone
                            width={preview.width}
                            height={preview.height}
                            style={{
                                width: preview.width,
                                height: preview.height,
                                resizeMode: 'cover',
                                borderWidth: 1,
                            }}
                            source={{ uri: preview.uri }}
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
                            <SimpleButton
                                label='Upload Image'
                                onPress={onSubmit}
                                disabled={uploading}
                            />

                            <SimpleButton
                                label='Change Image'
                                onPress={openSelector}
                                disabled={uploading}
                            />

                        </View>

                    ) : (
                        <SimpleButton
                            label='Select Image'
                            onPress={openSelector}
                            disabled={uploading}
                        />
                    )}

                </View>
            </View>
        </View>
    )
}