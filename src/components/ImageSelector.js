import React, { useContext, useEffect, useState } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    Preview,
} from '.'
import EXIF from 'exif-js'
import { AppContext } from '@context'
import { openFileSelector } from 'src/utils/images'

const initialSize = 280

export default ({ onSelected }) => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)
    
    const dims = useWindowDimensions()

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)

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

    useEffect(() => {
        initFileSelector()
    }, [])

    const initFileSelector = async () => {
        const uri = await openFileSelector()
        if (uri) handleSelectedImage(uri)
    }

    const handleSelectedImage = async uri => {
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif)
        }

        const blob = await dataURItoBlob(uri)

        dispatch({ type: 'SET_LOADING', loading: 'Processing selected image...' })
        
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const image = new Image()
        image.onload = async () => {
            const data = await handleImageData(image, exif)
            
            dispatch({ type: 'SET_LOADING', loading: null })

            setPayload(data)
            
        }
        image.src = src
    }

    useEffect(() => {
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        } else if (preview) {
            setPreview(null)

            onSelected(null)
        }
    }, [payload])

    const handleImageData = async (image, srcOrientation) => {
        const userId = user._id
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

        if (!payload) {
            console.log('no image data to submit.')
            return
        }

        const { imageData, thumbData, userId } = payload
        setPayload(null)

        onSelected({ imageData, thumbData, userId })

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
                            disabled={loading}
                            onPress={onSubmit}
                        />

                        <IconButton
                            label='Change Image'
                            disabled={loading}
                            onPress={initFileSelector}
                        />

                    </View>

                ) : (
                    <IconButton
                        type='primary'
                        label='Select Image'
                        disabled={loading}
                        onPress={initFileSelector}
                    />
                )}

            </View>
        </View>
    )
}