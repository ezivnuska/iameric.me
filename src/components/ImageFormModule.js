import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    FileSelector,
    ImageWithURI,
    LoadingView,
    Preview,
} from '.'
// import ReactAvatarEditor from 'react-avatar-editor'
import { Button } from 'antd'
import EXIF from 'exif-js'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { dataURItoBlob, handleUpload, imageToDataURIs, uploadImage } from '../Upload'

const initialSize = 300

export default ({ onImageSelected, removeImage, uri }) => {

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
    
    const [attachment, setAttachment] = useState(null)
    // useEffect(() => {
        
    //     if (!dims) return

    //     const dropzone = document.getElementById('dropzone')
        
    //     if (dropzone) {
    //         const maxWidth = size
    //         const actualWidth = dropzone.offsetWidth
    //         const width = actualWidth > maxWidth ? maxWidth : actualWidth
    //         setSize(width)
    //     }
    // }, [dims])

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleDrop = async uri => {

        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif)
        }

        const blob = await dataURItoBlob(uri)
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const image = new Image()
        image.onload = async () => {
            const data = await handleImageData(image, exif)
            
            const { uri, height, width } = data.imageData
            
            setPreview({ uri, height, width })
            
            // setPayload(data)
            onImageSelected(data)
            
            setLoading(false)
        }
        image.src = src
    }

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

        setLoading(true)
        
        onImageSelected(payload)
    }

    const clearPreview = () => {
        setPayload(null)
        setPreview(null)
    }

    const renderImage = () => uri ? (
        <View
            style={{
                paddingRight: 10,
            }}
        >
            <Image
                source={{ uri }}
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'stretch',
                }}
            />
        </View>
    ) : null

    const renderControls = () => (
        <View
            style={{
                borderWidth: 1,
                borderStyle: 'dotted',
            }}
        >
            
            {uri ? (
                <Button
                    type='primary'
                    size='small'
                    onClick={removeImage}
                    >
                    <Text>Remove Image</Text>
                </Button>
            ) : null}

            <FileSelector
                onImageSelected={handleDrop}
            />
        </View>
    )

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}
        >
            
            {uri ? (
                <View style={{ paddingRight: 10 }}>
                    <ImageWithURI
                        source={{ uri }}
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'stretch',
                        }}
                    />
                </View>
            ) : null}
                
            {renderControls()}

            {/* <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 15,
                width: size,
            }}>
                <Button
                    disabled={!preview || !payload}
                    onClick={onSubmit}
                >
                    Select/Upload
                </Button>

                <Button
                    disabled={!preview || !payload}
                    onClick={clearPreview}
                >
                    Clear
                </Button>

            </View> */}

        </View>
    )
}