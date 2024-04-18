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
    useModal,
    useUser,
} from '@context'
import { openSelector, uploadImageData } from '@utils/images'

const initialSize = 280

export default () => {

    const { dims } = useApp()
    const {
        addImage,
        profile,
        setUserLoading,
        userLoading,
    } = useUser()
    const { closeModal } = useModal()

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)

    useEffect(() => {
        const init = async () => {
            setUserLoading(true)
            const selection = await openSelector()
            setUserLoading(false)
            setPayload(selection)
        }
        init()
    }, [])
    
    useEffect(() => {
        const dropzone = document.getElementById('dropzone')
        if (dropzone) {
            const maxWidth = size
            const actualWidth = dropzone.offsetWidth
            const width = actualWidth > maxWidth ? maxWidth : actualWidth
            setSize(width)
        }
    }, [dims])
    
    // const openSelector = async () => {
    //     const uri = await openFileSelector()
    //     if (uri) handleSelectedImage(uri)
    //     else console.log('no uri recieved from selector')
    //     return uri
    // }

    // const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    // const handleSelectedImage = async uri => {
    //     setUserLoading(true)
    //     const blob = await dataURItoBlob(uri)
    //     const reader = new FileReader()
    //     reader.onload = ({ target }) => {
    //         const exif = EXIF.readFromBinaryFile(target.result)
    //         loadImage(uri, exif)
    //     }
    //     reader.readAsArrayBuffer(blob)
    // }

    // const loadImage = async (src, exif) => {
    //     const image = new Image()
    //     image.onload = async () => {
    //         const data = await handleImageData(image, exif)
    //         setUserLoading(false)
    //         setPayload(data)
    //     }
    //     image.src = src
    // }

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
        if (process.env.NODE_ENV === 'development') {
            console.log('cant upload in dev')
            return null
        }

        setUserLoading(true)
        const image = await uploadImageData(imageData)
        setUserLoading(false)
        if (!image) conaole.log('error uploading image')
        else addImage(image)
        closeModal()
    }

    const handleImageData = async (image, srcOrientation) => {
        const userId = profile._id
        const imageData = await getImageData(image, srcOrientation)
        const thumbData = await getThumbData(image, srcOrientation)
        const filename = `${userId}-${Date.now()}.png`

        return {
            imageData: { ...imageData, filename },
            thumbData: { ...thumbData, filename },
            userId,
        }
    }

    const getImageData = async (image, srcOrientation) => {
        
        const { height, width } = image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let imageWidth = width
        let imageHeight = height

        if (srcOrientation > 4 && srcOrientation < 9) {
            imageWidth = height
            imageHeight = width
        }

        const MAX_WIDTH = 340

        if (imageWidth >= MAX_WIDTH) {
            imageWidth = MAX_WIDTH
            imageHeight *= MAX_WIDTH / width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageURI = canvas.toDataURL('image/png:base64;')

        return {
            height: imageHeight,
            width: imageWidth,
            uri: imageURI,
        }
    }

    const getThumbData = async (image, srcOrientation) => {
        
        const { height, width } = image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let imageWidth = width
        let imageHeight = height

        if (srcOrientation > 4 && srcOrientation < 9) {
            imageWidth = height
            imageHeight = width
        }

        const THUMB_WIDTH = 50

        if (imageWidth >= THUMB_WIDTH) {
            imageWidth = THUMB_WIDTH
            imageHeight *= THUMB_WIDTH / width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageURI = canvas.toDataURL('image/png:base64;')

        return {
            height: imageHeight,
            width: imageWidth,
            uri: imageURI,
        }
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
            <ThemedText>Hello</ThemedText>
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
                            disabled={userLoading}
                            onPress={onSubmit}
                        />

                        <IconButton
                            label='Change Image'
                            disabled={userLoading}
                            onPress={openSelector}
                        />

                    </View>

                ) : (
                    <IconButton
                        type='primary'
                        label='Select Image'
                        disabled={userLoading}
                        onPress={openSelector}
                    />
                )}

            </View>
        </View>
    )
}