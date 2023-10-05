import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FileSelector,
} from './'
import ReactAvatarEditor from 'react-avatar-editor'
import { Button } from 'antd'
import EXIF from 'exif-js'
import axios from 'axios'
import { AppContext } from '../AppContext'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const initialSize = 300

export default ({ user, onUpload = null }) => {

    const {
        dims,
        dispatch,
    } = useContext(AppContext)

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [editor, setEditor] = useState(null)
    const [dropping, setDropping] = useState(false)

    useEffect(() => {
        console.log('user', user)
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
        setDropping(true)
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
            setDropping(false)
        }

        image.src = srcBase64
    }

    const onSubmit = () => {
        if (editor) {
            const canvas = editor.getImage()
            const src = canvas.toDataURL('image/png;base64;')
            loadPreview(src)
        }
    }

    // const loadPreview = async src => {

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

    const loadPreview = async src => {

        const image = new Image()
        
        const THUMB_SIZE = 100
        const AVATAR_SIZE = 200

        image.onload = async () => {
            
            const timestamp = Date.now()

            const thumb = imageToDataURI(image, THUMB_SIZE)
            const thumbSaved = await uploadThumb(thumb, timestamp)
            
            if (!thumbSaved) return console.log('Error uploading thumb')
            console.log('thumb saved!')

            const avatar = imageToDataURI(image, AVATAR_SIZE)
            
            const response = await uploadAvatar(avatar, timestamp)
            console.log('response', response)
            const { images, profileImage } = response
            
            if (onUpload) onUpload(images, profileImage)
        }

        image.src = src
    }

    const imageToDataURI = (image, maxSize) => {
        
        const canvas = document.createElement('canvas')
            
        const originalWidth = image.width
        const originalHeight = image.height

        if (originalHeight > maxSize) {
            image.width *= maxSize / originalHeight
            image.height = maxSize
        }
    
        if (originalWidth > maxSize) {
            image.height *= maxSize / originalWidth
            image.width = maxSize
        }
    
        canvas.width = image.width
        canvas.height = image.height

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, image.width, image.height)
    
        const dataURI = canvas.toDataURL('image/png;base64;')

        return dataURI
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
        console.log('thumb uploaded>>', data.thumb)
        return true
        // dispatch({ type: 'SET_USER', user: data.user })
        
        // if (onComplete) onComplete()
    }

    const uploadAvatar = async (avatar, timestamp) => {
        
        const { data } = await axios
            .post('/api/upload/avatar', {
                _id: user._id,
                avatar,
                timestamp,
            }, { new: true })
        
        if (!data) return false

        console.log('avatar saved!', data)

        const { images, profileImage } = data
        console.log('images', images)
        console.log('profileImage', profileImage)
        return { images, profileImage }
    }

    const clearPreview = () => setPreview(null)

    return (
        <View
            id='dropzone'
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'red'
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
                    style={{ borderWidth: 1, borderStyle: 'dashed' }}
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
                borderWidth: 1,
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
    )
}