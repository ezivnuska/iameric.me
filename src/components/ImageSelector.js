import React, { useContext, useEffect, useState } from 'react'
import {
    Platform,
    View,
} from 'react-native'
import {
    // FileSelector,
    LoadingView,
    Preview,
} from '.'
import { Button } from 'antd'
import EXIF from 'exif-js'
import { AppContext } from '../AppContext'
import { openFileSelector } from 'src/utils/images'

const initialSize = 300

export default ({ onSelected }) => {

    const {
        dims,
        dispatch,
        user,
    } = useContext(AppContext)

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [editor, setEditor] = useState(null)
    const [loading, setLoading] = useState(null)
    const [payload, setPayload] = useState(null)

    useEffect(() => {
        
        if (!dims) return

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
        init()
    }, [])

    const init = async () => {
        const uri = await openFileSelector()
        if (uri) handleSelectedImage(uri)
    }

    const handleSelectedImage = async uri => {
        const reader = new FileReader()
        // console.log('reading selected uri')
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            // console.log('selected uri read')
            // console.log('loading selected uri with exif data')
            loadImage(uri, exif)
        }

        const blob = await dataURItoBlob(uri)
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const image = new Image()
        // console.log('loading image')
        image.onload = async () => {
            const data = await handleImageData(image, exif)
            // console.log('image loaded')
            // console.log('image data', data)
            
            setPayload(data)
            
            setLoading(false)
        }
        image.src = src
    }

    useEffect(() => {
        // console.log('setting payload', payload)
        if (payload) {
            const { uri, height, width } = payload.imageData
            // console.log('setting preview', payload.imageData)
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

        // setLoading(true)
        const { imageData, thumbData, userId } = payload
        setPayload(null)

        onSelected({ imageData, thumbData, userId })

    }

    return !loading ? (
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
                <Preview
                    width={preview.width}
                    height={preview.height}
                    uri={preview.uri}
                />
            ) : null}

            {/* (
                <Button
            //         size='small'
            //         onClick={handleSelectedImage}
            //     >
            //         Pick an Image
            //     </Button>
            // ) */}
            
            {preview ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginVertical: 15,
                        width: size,
                        // backgroundColor: 'red',
                    }}
                >
                    <Button
                        disabled={loading}
                        onClick={onSubmit}
                    >
                        Upload
                    </Button>

                    <Button
                        disabled={loading}
                        onClick={() => {
                            // setPayload(null)
                            openFileSelector()
                        }}
                    >
                        Change
                    </Button>

                    <Button
                        disabled={loading}
                        onClick={() => setPayload(null)}
                    >
                        Cancel
                    </Button>

                </View>
            ) : null}

        </View>
    ) : (
        <LoadingView label={loading} />
    )
}