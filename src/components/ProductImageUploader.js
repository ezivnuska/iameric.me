import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    TouchableOpacity,
} from 'react-native'
import {
    FileSelector,
    ImagePreview,
    LoadingView,
} from '.'
import ReactAvatarEditor from 'react-avatar-editor'
import { Button } from 'antd'
import EXIF from 'exif-js'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { dataURItoBlob, handleUpload, imageToDataURIs, uploadImage } from '../Upload'
const IMAGE_PATH = __DEV__ ? 'https://www.iameric.me/assets' : '/assets'

const initialSize = 300

const UploadedImageList = images => {
    return (
        <View>
            {uploadedItems.map((item, index) => {
                const path = `${IMAGE_PATH}/${user.username}/thumb/${item}`
                console.log('>>preview', path)
                return (
                    <TouchableOpacity
                        onPress={() => deletePreview(item)}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    >
                        <ImagePreview
                            key={`preview-${index}`}
                            path={path}
                        />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ({ onImageUploaded }) => {

    const {
        dims,
        dispatch,
        user,
    } = useContext(AppContext)

    const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [editor, setEditor] = useState(null)
    const [loading, setLoading] = useState(null)
    const [uploadedItems, setUploadedItems] = useState([])

    useEffect(() => {
        console.log('UploadedItems:', uploadedItems)
    }, [uploadedItems])

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

    useEffect(() => {
        console.log('image preview changed', preview)
    }, [preview])

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const onImageSelected = async uri => {
        
        setLoading('Loading image preview...')
        const blob = await dataURItoBlob(uri)
        
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            handleOrientation(uri, exif)
        }
        reader.readAsArrayBuffer(blob)
    }

    const handleOrientation = async (srcBase64, srcOrientation) => {

        const image = new Image()
        image.onload = async () => {
            const { height, width } = image
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            console.log('image loaded...', width, height)

            const filename = `${user._id}-${Date.now()}.png`

            let imageWidth = width
            let imageHeight = height
            let thumbWidth
            let thumbHeight

            if (srcOrientation > 4 && srcOrientation < 9) {
                imageWidth = height
                imageHeight = width
            }

            const MAX_WIDTH = 200
            const THUMB_WIDTH = 50

            if (imageWidth > MAX_WIDTH) {
                imageWidth = MAX_WIDTH
                imageHeight *= MAX_WIDTH / width
            }

            canvas.width = imageWidth
            canvas.height = imageHeight

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, imageWidth, imageHeight)

            const imageData = {
                height: imageHeight,
                width: imageWidth,
                uri: canvas.toDataURL('image/png:base64;'),
                filename,
            }

            console.log('imageData', imageData)

            thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
            thumbHeight = imageWidth * (THUMB_WIDTH / imageWidth)

            canvas.width = thumbWidth
            canvas.height = thumbHeight

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, thumbWidth, thumbHeight)

            const thumbData = {
                height: thumbHeight,
                width: thumbWidth,
                uri: canvas.toDataURL('image/png:base64;'),
                filename,
            }

            console.log('thumbData', thumbData)

            const payload = {
                userId: user._id,
                imageData,
                thumbData,
            }

            await uploadImageData(payload)
        }

        image.src = srcBase64
    }

    const uploadImageData = async payload => {
        
        const { data } = await axios
            .post(`/api/image/upload`, payload)

            
        if (!data) {
            setLoading(null)
            console.log('Error uploading image/thumb')
            return null
        }

        console.log('image/thumb uploaded!', data)

        // else id = await handleUpload(user._id, thumbData.uri, timestamp, 'thumb')
        // console.log('thumb uploaded!', id)

        setPreview(data.filename)

        setLoading(null)

        onImageUploaded(data.filename)
    }

    const onSubmit = async () => {
        // if (editor) {
        //     setLoading('Uploading image...')
        //     const canvas = editor.getImage()
        //     const src = canvas.toDataURL('image/png;base64;')
        //     // const id = await uploadImage(user._id, src)
        //     let image = new Image()

        //     image.onload = async () => {
        //         const timestamp = Date.now()
        //         const { imageURI, thumbURI } = imageToDataURIs(image)
        //         let id = await handleUpload(user._id, imageURI, timestamp)
        //         console.log('image uploaded!', id)
        //         if (!id) return null
        //         else id = await handleUpload(user._id, thumbURI, timestamp, 'thumb')
        //         console.log('thumb uploaded!', id)
        //         setLoading(null)
        //         onImageUploaded(id)
        //     }

        //     image.src = src
        // }
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

            {uploadedItems.length ? (
                <UploadedImageList images={uploadedItems} />
            ) : null}
            
            {preview ? (
                // <ReactAvatarEditor
                //     image={preview}
                //     width={size - 50}
                //     height={size - 50}
                //     border={25}
                //     color={[0, 0, 0, 0.2]}
                //     scale={1.2}
                //     rotate={0}
                //     ref={ref => setEditor(ref)}
                // />
                <ImagePreview
                    path={`${IMAGE_PATH}/${user.username}/thumb/${preview}`}
                />
            ) : (
                <FileSelector
                    onImageSelected={onImageSelected}
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