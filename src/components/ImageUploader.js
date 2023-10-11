import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FileSelector, LoadingView,
} from './'
import ReactAvatarEditor from 'react-avatar-editor'
import { Button } from 'antd'
import EXIF from 'exif-js'
import axios from 'axios'
import { AppContext } from '../AppContext'

const initialSize = 300

export default ({ user, onComplete }) => {

    const {
        dims,
        dispatch,
    } = useContext(AppContext)

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [editor, setEditor] = useState(null)
    const [loading, setLoading] = useState(null)

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

    const handleDrop = async dataURI => {
        const reader = new FileReader()
        
        reader.onload = e => {
            const image = e.target.result
            const exif = EXIF.readFromBinaryFile(image)
            handleOrientation(dataURI, exif ? exif.Orientation : null)
        }

        const blob = await dataURItoBlob(dataURI)
        reader.readAsArrayBuffer(blob)
    }

    const handleOrientation = (srcBase64, srcOrientation) => {
        const image = new Image()
        image.onload = () => {
            const width = image.width
            const height = image.height
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (srcOrientation > 4 && srcOrientation < 9) {
                canvas.width = height
                canvas.height = width
            } else {
                canvas.width = width
                canvas.height = height
            }

            ctx.drawImage(image, 0, 0)
            setPreview(canvas.toDataURL())
        }

        image.src = srcBase64
    }

    const onSubmit = () => {
        if (editor) {
            const canvas = editor.getImage()
            const src = canvas.toDataURL('image/png;base64;')
            handleUpload(src)
        }
    }

    const handleUpload = async src => {
        setLoading('Uploading...')
        const image = new Image()
        image.onload = async () => {
            const timestamp = Date.now()
            const { imageURI, thumbURI } = imageToDataURIs(image)
            const id = await uploadImage(imageURI, timestamp)
            if (!id) setLoading(null)
            else {
                await uploadImage(thumbURI, timestamp, 'thumb')
                dispatch({ type: 'ADD_IMAGE', id })
                setLoading(null)
            }
            onComplete(id)
        }
        image.src = src
    }

    const imageToDataURIs = image => {
        const canvas = document.createElement('canvas')
        
        const originalWidth = image.width

        let imageWidth = image.width
        let imageHeight = image.height
        let thumbWidth
        let thumbHeight

        const IMAGE_WIDTH = 200
        const THUMB_WIDTH = 50

        if (originalWidth > IMAGE_WIDTH) {
            imageWidth = IMAGE_WIDTH
            imageHeight *= IMAGE_WIDTH / originalWidth
        }

        thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
        thumbHeight = imageWidth * (THUMB_WIDTH / imageWidth)
    
        canvas.width = imageWidth
        canvas.height = imageHeight

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight)
    
        const imageURI = canvas.toDataURL('image/png;base64;')
    
        canvas.width = thumbWidth
        canvas.height = thumbHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, thumbWidth, thumbHeight)

        const thumbURI = canvas.toDataURL('image/png;base64;')

        return { imageURI, thumbURI }
    }

    const uploadImage = async (dataURI, timestamp, type = null) => {
        
        setLoading(`Uploading Image.${type ? ` (${type})` : ''}`)
        
        const { data } = await axios
            .post(`/api/image/upload`, {
                _id: user._id,
                dataURI,
                timestamp,
                type,
            })
        
        setLoading(null)
        
        if (!data) {
            console.log(`Error uploading image.${type ? ` (${type})` : ''}`)
            return null
        }
        
        return data.id
    }

    const clearPreview = () => setPreview(null)

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
                <ReactAvatarEditor
                    image={preview}
                    width={size - 50}
                    height={size - 50}
                    border={25}
                    color={[0, 0, 0, 0.2]}
                    scale={1.2}
                    rotate={0}
                    ref={ref => setEditor(ref)}
                />
            ) : (
                <FileSelector
                    handleDrop={uri => handleDrop(uri)}
                />
            )}
                
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 15,
                width: size,
            }}>
                
                <Button
                    disabled={!editor}
                    onClick={onSubmit}
                >
                    Upload
                </Button>

                <Button
                    disabled={!preview}
                    onClick={clearPreview}
                >
                    Clear
                </Button>

            </View>

        </View>
    ) : (
        <LoadingView label={loading} />
    )
}