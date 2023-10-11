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

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
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
        if (!user || !user.profileImage) return
        if (user.profileImage.filename) setPreview(`${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`)
    }, [])

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

    // const uploadImages = async src => {

    //     const image = new Image()
        
    //     image.onload = async () => {
    
    //         const canvas = document.createElement('canvas')
        
    //         if (image.height > MAX_SIZE) {
    //             image.width *= MAX_SIZE / image.height
    //             image.height = MAX_SIZE
    //         }
        
    //         if (image.width > MAX_SIZE) {
    //             image.height *= MAX_SIZE / image.width
    //             image.width = MAX_SIZE
    //         }
        
    //         const ctx = canvas.getContext('2d')
    //         canvas.width = image.width
    //         canvas.height = image.height
    //         ctx.clearRect(0, 0, canvas.width, canvas.height)
    //         ctx.drawImage(image, 0, 0, image.width, image.height)
        
    //         const dataURL = canvas.toDataURL('image/png;base64;')

    //         saveDataURI(dataURL)
    //     }

    //     image.src = src
    // }

    const handleUpload = async src => {
        setLoading('Uploading...')
        const image = new Image()
        image.onload = async () => {
            const timestamp = Date.now()
            const { imageURI, thumbURI } = imageToDataURIs(image)
            const id = await uploadImage(imageURI, timestamp)
            console.log('id...', id)
            if (!id) setLoading(null)
            else {
                const thumbId = await uploadImage(thumbURI, timestamp, 'thumb')
                console.log(`\n${id}\n${thumbId}\n`)
                dispatch({ type: 'ADD_IMAGE', id })
                setLoading(null)
            }
            onComplete(id)
        }
        image.src = src
    }

    // const uploadImages = async src => {

    //     setLoading('Loading Image...')

    //     const image = new Image()
        
    //     const THUMB_SIZE = 100
    //     const AVATAR_SIZE = 300

    //     image.onload = async () => {
            
    //         setLoading('Uploading Thumbnail...')
    //         const timestamp = Date.now()

    //         const thumb = imageToDataURI(image, THUMB_SIZE)
    //         const thumbSaved = await uploadThumb(thumb, timestamp)
            
    //         if (!thumbSaved) return console.log('Error uploading thumb')

    //         setLoading('Uploading Image...')

    //         const avatar = imageToDataURI(image, AVATAR_SIZE)
    //         const response = await uploadAvatar(avatar, timestamp)
            
    //         const { images, profileImage } = response
            
    //         dispatch({ type: 'SET_USER_IMAGES', images })

    //         if (profileImage) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage })

    //         if (onComplete) onComplete(images)
    //     }

    //     image.src = src
    // }

    // const getOrientation = (width, height) => width > height ? 'landscape' : 'portrait'

    const imageToDataURIs = image => {
        const canvas = document.createElement('canvas')
        
        const originalWidth = image.width
        const originalHeight = image.height

        let imageWidth = image.width
        let imageHeight = image.height
        let thumbWidth
        let thumbHeight

        const IMAGE_WIDTH = 200
        const THUMB_WIDTH = 50

        // const orientation = getOrientation(originalWidth, originalHeight)

        if (originalWidth > IMAGE_WIDTH) {
            imageWidth = IMAGE_WIDTH
            imageHeight *= IMAGE_WIDTH / originalWidth
        }

        thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
        thumbHeight = imageWidth * (THUMB_WIDTH / imageWidth)

        // if (orientation === 'landscape') {
        // } else {
        //     if (originalWidth > maxSize) {

        //     }
        // }

        // if (image.height > maxSize) {
        //     image.width *= maxSize / image.height
        //     image.height = maxSize
        // }
    
        // if (image.width > maxSize) {
        //     image.height *= maxSize / image.width
        //     image.width = maxSize
        // }

        // image.width = newWidth
        // image.height = newHeight
    
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
        
        if (!data) return console.log(`Error uploading image.${type ? ` (${type})` : ''}`)
        console.log('data from image upload...', data)
        return data.id
    }

    const uploadThumb = async (thumb, timestamp) => {
        
        const { data } = await axios
            .post('/api/upload/thumb', {
                _id: user._id,
                thumb,
                timestamp,
            }, { new: true })
        
        if (!data.thumb) {
            console.log('Error uploading thumbnail', err)
            return false
        }
        
        return true
    }

    const uploadAvatar = async (avatar, timestamp) => {
        
        const { data } = await axios
            .post('/api/upload/avatar', {
                _id: user._id,
                avatar,
                timestamp,
            }, { new: true })
        
        if (!data) return false

        const { images, profileImage } = data

        return { images, profileImage }
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
                    // style={{ borderWidth: 1, borderStyle: 'dashed' }}
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
                // alignContent: 'space-between',
                // borderWidth: 1,
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