import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FileSelector,
    LoadingView,
    Preview,
} from './'
// import ReactAvatarEditor from 'react-avatar-editor'
import { Button } from 'antd'
import EXIF from 'exif-js'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { dataURItoBlob, handleUpload, imageToDataURIs, uploadImage } from '../Upload'

const initialSize = 300

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

    // useEffect(() => {
    //     console.log('preview', preview)
    // }, [preview])

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const createImage = url =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
        })
    
    const exportFromCanvas = async (
        canvas,
        qualityReductionFactor,
    ) => {
        return new Promise(resolve => {
            canvas.toBlob(
                file => {
                    resolve(URL.createObjectURL(file))
                },
                'image/jpeg',
                qualityReductionFactor
            )
        })
    }

    const getRadianAngle = degreeValue => {
        return (degreeValue * Math.PI) / 180
    }

    const SIZE_REDUCTION_FACTOR = 0.125
    const QUALITY_REDUCTION_FACTOR = 0.4

    const useCanvasImage = (
        reductionFactor = SIZE_REDUCTION_FACTOR,
        qualityReductionFactor = QUALITY_REDUCTION_FACTOR,
        ) => {
        const getImage = async (
            imageSrc, 
            pixelCrop = null, 
            rotation = 0
        ) => {
            const image = await createImage(imageSrc)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
        
            if (!pixelCrop) {
                pixelCrop = {
                    width: image.width,
                    height: image.height,
                    x: 0,
                    y: 0,
                }
            }

            const safeArea = Math.max(image.width, image.height)
        
            canvas.width = safeArea
            canvas.height = safeArea
        
            ctx.translate(
                safeArea * reductionFactor,
                safeArea * reductionFactor
            )

            ctx.rotate(getRadianAngle(rotation))
            
            ctx.translate(
                -safeArea * reductionFactor,
                -safeArea * reductionFactor
            )
            ctx.drawImage(
                image,
                safeArea * reductionFactor - image.width * reductionFactor,
                safeArea * reductionFactor - image.height * reductionFactor
            )
        
            const data = ctx.getImageData(0, 0, safeArea, safeArea)
        
            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height
        
            ctx.putImageData(
                data,
                0 -
                    safeArea * reductionFactor +
                    image.width * reductionFactor -
                    pixelCrop.x,
                0 -
                    safeArea * reductionFactor +
                    image.height * reductionFactor -
                    pixelCrop.y
            )

            const exported = await exportFromCanvas(
                canvas,
                qualityReductionFactor,
            )
            console.log('exported', exported)
            return exported
        }
      
        return { getImage }
    }

    // const onDrop = uri => {

    // }

    // const handleDroppedFile = async file => {
        
    //     const { getImage } = useCanvasImage()
    //     const blob = await dataURItoBlob(file)

    //     const reader = new FileReader()
    //     reader.onload = async ({ target }) => {
    //         if (target) {
                
    //             const image = await getImage(target.result)
                
    //             setPreview(image)
    //         }
    //     }
    //     reader.readAsDataURL(blob)
    // }

    const handleDrop = async uri => {

        const blob = await dataURItoBlob(uri)
        
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif)
        }
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const image = new Image()
        image.onload = async () => {
            const payload = await handleImageData(image, exif)
            const { imageData } = payload
            const { uri, height, width } = imageData
            setPayload(payload)
            setPreview({
                uri,
                height,
                width,
            })
            setLoading(null)
        }
        image.src = src
    }

    const handleImageData = async (image, srcOrientation) => {
        
        const { height, width } = image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const filename = `${user._id}-${Date.now()}.png`

        let imageWidth = width
        let imageHeight = height
        let thumbWidth
        let thumbHeight

        if (srcOrientation > 4 && srcOrientation < 9) {
            imageWidth = height
            imageHeight = width
        }

        const MAX_WIDTH = 340
        const THUMB_WIDTH = 50

        if (imageWidth >= MAX_WIDTH) {
            imageWidth = MAX_WIDTH
            imageHeight *= MAX_WIDTH / width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageURI = canvas.toDataURL('image/png:base64;')

        const imageData = {
            height: imageHeight,
            width: imageWidth,
            uri: imageURI,
            filename,
        }

        thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
        thumbHeight = imageHeight * (THUMB_WIDTH / imageWidth)

        canvas.width = thumbWidth
        canvas.height = thumbHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const thumbURI = canvas.toDataURL('image/png:base64;')

        const thumbData = {
            height: thumbHeight,
            width: thumbWidth,
            uri: thumbURI,
            filename,
        }

        const payload = {
            userId: user._id,
            imageData,
            thumbData,
        }

        return payload
    }

    // const handleOrientation = async (srcBase64, srcOrientation) => {

    //     const image = new Image()
    //     image.onload = async () => {
    //         const { height, width } = image
    //         const canvas = document.createElement('canvas')
    //         const ctx = canvas.getContext('2d')

    //         const filename = `${user._id}-${Date.now()}.png`

    //         let imageWidth = width
    //         let imageHeight = height
    //         let thumbWidth
    //         let thumbHeight

    //         if (srcOrientation > 4 && srcOrientation < 9) {
    //             imageWidth = height
    //             imageHeight = width
    //         }

    //         const MAX_WIDTH = 300
    //         const THUMB_WIDTH = 50

    //         if (imageWidth >= MAX_WIDTH) {
    //             imageWidth = MAX_WIDTH
    //             imageHeight *= MAX_WIDTH / width
    //         }

    //         canvas.width = imageWidth
    //         canvas.height = imageHeight

    //         ctx.clearRect(0, 0, canvas.width, canvas.height)
    //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    //         const imageURI = canvas.toDataURL('image/png:base64;')

    //         const imageData = {
    //             height: imageHeight,
    //             width: imageWidth,
    //             uri: imageURI,
    //             filename,
    //         }

    //         thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
    //         thumbHeight = imageHeight * (THUMB_WIDTH / imageWidth)

    //         canvas.width = thumbWidth
    //         canvas.height = thumbHeight

    //         ctx.clearRect(0, 0, canvas.width, canvas.height)
    //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    //         const thumbURI = canvas.toDataURL('image/png:base64;')

    //         const thumbData = {
    //             height: thumbHeight,
    //             width: thumbWidth,
    //             uri: thumbURI,
    //             filename,
    //         }

    //         const payload = {
    //             userId: user._id,
    //             imageData,
    //             thumbData,
    //         }
    //         console.log('imageURI....', imageURI)
    //         console.log('typeof imageURI....', typeof imageURI)
    //         setPayload(payload)
    //         setPreview({
    //             uri: imageData.uri,
    //             height: imageData.height,
    //             width: imageData.width,
    //         })
    //         setLoading(null)
    //     }

    //     image.src = srcBase64
    // }

    const uploadImageData = async payload => {
        
        const { data } = await axios
            .post(`/api/image/upload`, payload)

        setLoading(null)

        if (!data) {
            console.log('Error uploading image/thumb')
            return null
        }

        console.log('ImageUploader: image/thumb uploaded!', data)

        return data
    }

    const onSubmit = async () => {

        if (!payload) {
            console.log('no image data to submit.')
            return
        }

        const { image } = await uploadImageData(payload)
        
        // setPreview(filename)

        onImageUploaded(image)
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
        //     // console.log('onSubmit:uploadImage:', id)
            
        //     // if (!id) {
        //     //     console.log('no id returned from upload', id)
        //     // }
        //     // else {
        //     //     console.log('id returned from upload', id)
        //     //     dispatch({ type: 'ADD_IMAGE', id })
        //     // }
        // }
    }

    // const handleUpload = async src => {
    //     setLoading('Uploading...')
    //     const image = new Image()
    //     image.onload = async () => {
    //         const timestamp = Date.now()
    //         const { imageURI, thumbURI } = imageToDataURIs(image)
    //         const id = await uploadImage(imageURI, timestamp)
    //         if (!id) setLoading(null)
    //         else {
    //             await uploadImage(thumbURI, timestamp, 'thumb')
    //             dispatch({ type: 'ADD_IMAGE', id })
    //             setLoading(null)
    //         }
    //         onComplete(id)
    //     }
    //     image.src = src
    // }

    // const imageToDataURIs = image => {
    //     const canvas = document.createElement('canvas')
        
    //     const originalWidth = image.width

    //     let imageWidth = image.width
    //     let imageHeight = image.height
    //     let thumbWidth
    //     let thumbHeight

    //     const IMAGE_WIDTH = 200
    //     const THUMB_WIDTH = 50

    //     if (originalWidth > IMAGE_WIDTH) {
    //         imageWidth = IMAGE_WIDTH
    //         imageHeight *= IMAGE_WIDTH / originalWidth
    //     }

    //     thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
    //     thumbHeight = imageWidth * (THUMB_WIDTH / imageWidth)
    
    //     canvas.width = imageWidth
    //     canvas.height = imageHeight

    //     const ctx = canvas.getContext('2d')
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     ctx.drawImage(image, 0, 0, imageWidth, imageHeight)
    
    //     const imageURI = canvas.toDataURL('image/png;base64;')
    
    //     canvas.width = thumbWidth
    //     canvas.height = thumbHeight

    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     ctx.drawImage(image, 0, 0, thumbWidth, thumbHeight)

    //     const thumbURI = canvas.toDataURL('image/png;base64;')

    //     return { imageURI, thumbURI }
    // }

    // const uploadImage = async (dataURI, timestamp, type = null) => {
        
    //     setLoading(`Uploading Image.${type ? ` (${type})` : ''}`)
        
    //     const { data } = await axios
    //         .post(`/api/image/upload`, {
    //             _id: user._id,
    //             dataURI,
    //             timestamp,
    //             type,
    //         })
        
    //     setLoading(null)
        
    //     if (!data) {
    //         console.log(`Error uploading image.${type ? ` (${type})` : ''}`)
    //         return null
    //     }
        
    //     return data.id
    // }

    // const reactAvatarEditor = () => (
    //     <ReactAvatarEditor
    //         image={preview}
    //         width={size - 50}
    //         height={size - 50}
    //         border={25}
    //         color={[0, 0, 0, 0.2]}
    //         scale={1.2}
    //         rotate={0}
    //         ref={ref => setEditor(ref)}
    //     />
    // )

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
                <Preview
                    height={preview.height}
                    width={preview.width}
                    imageURI={preview.uri}
                />
            ) : (
                <FileSelector
                    onImageSelected={handleDrop}
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
                    disabled={!preview}
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