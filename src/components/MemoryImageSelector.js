import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, IconButton } from 'react-native-paper'
import { ImagePreview } from '@components'
import { useMemory, useModal, useUser } from '@context'
import { getMaxImageDims, handleImageData, openFileSelector } from '@utils/images'
import EXIF from 'exif-js'
import { getDate, getMonth, getYear } from 'date-fns'
import { addMemoryImage } from 'src/utils/memories'

const MemoryImageSelector = ({ data }) => {

    const { closeModal } = useModal()
    const { user, uploading, setImageUpload, setUploading } = useUser()
    const { uploadData, setUploadData } = useMemory()

    const [imageDims, setImageDims] = useState(null)
    const [maxWidth, setMaxWidth] = useState(100)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [selectorOpen, setSelectorOpen] = useState(false)

    const [progress, setProgress] = useState(null)
    const [showActivity, setShowActivity] = useState(false)

    const onLayout = e => {

        // determine and set available width of parent element
        const parentWidth = e.nativeEvent.target.offsetParent.clientWidth
        setMaxWidth(parentWidth)

    }

    useEffect(() => {

        // open selector on mount
        openSelector()

    }, [])

    useEffect(() => {

        // if image is loaded and data is available
        if (payload) {

            const { imageData, thumbData } = payload
            const { uri, height, width } = imageData
            setPreview({ uri, height, width })
            setUploading(preview)
            setUploadData({
                imageData,
                thumbData,
                memoryId: data._id,
                preview: { uri, height, width },
            })
            // addMemoryImage(data._id, { imageData, thumbData })
            closeModal()

            // set preview from available data
            // const { uri, height, width } = payload.imageData
            // setPreview({ uri, height, width })
            setPayload(null)

        } else {
            setPreview(null)
        }
    }, [payload])

    useEffect(() => {

        // if image selected and preview available
        if (uploadData) {

            // set image dimensions to maximum size
            setImageDims(getMaxImageDims(uploadData.preview.width, uploadData.preview.height, maxWidth))

        } else {
            setImageDims(null)
        }

    }, [uploadData])

    const openSelector = async () => {

        setSelectorOpen(true)

        if (!showActivity) {
            setShowActivity(true)
        }

        const uri = await openFileSelector()
        
        setSelectorOpen(false)

        setShowActivity(false)
        
        if (uri) {
            handleSelectedImage(uri)
        } else {
            console.log('no selection made')
        }
    }

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleSelectedImage = async uri => {

        const blob = await dataURItoBlob(uri)
        
        const reader = new FileReader()
        
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif, user._id)
        }

        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif, id) => {
        
        const image = new Image()
        
        image.onload = async () => {
            const imageResult = await handleImageData(id, image, exif)
            if (imageResult) {

                setPayload(imageResult)

            }
            
        }

        image.src = src
    }

    // not working, yet

    // const onProgress = e => {

    //     if (e.lengthComputable) {
    //         const progress = Math.round((e.loaded / e.total) * 100)
    //         console.log(`Upload Progress: ${e.loaded}/${e.total}`)
    //         console.log('progress', progress)
    //         setProgress(progress)
    //     } else {
    //         console.log('upload data not computable')
    //     }
    // }

    // const handleUpload = async uploadData => {

    //     if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
    //     const { imageData, thumbData, userId } = uploadData
    //     const data = { imageData, thumbData, userId, avatar: data?.avatar }

    //     setUploading(preview)
    //     setImageUpload(data)
            
    //     closeModal()
    // }

    // const onCancel = () => {
    //     setShowActivity(false)
    //     setPayload(null)
    // }

    // const initUpload = () => {
    //     const { imageData, thumbData } = payload
    //     addMemoryImage(data._id, { imageData, thumbData })
    // }

    return (
        <View
            onLayout={onLayout}
            style={{
                flex: 1,
                // flexGrow: 1,
                // flexGrow: 1,
                gap: 10,
                // backgroundColor: 'rgba(0, 0, 0, 0.8)',
                position: 'relative',
            }}
        >

            <View
                // elevation={0}
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                    // borderWidth: 1,
                    // borderColor: 'red',
                }}
            >
                
                <Card.Title
                    title='Select Image'
                    titleVariant='headlineLarge'
                    right={() => <IconButton icon='close-thick' onPress={closeModal} size={30} />}
                />
                
                {/* <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {showActivity && <ActivityIndicator size='medium' />}
                    {imageDims && (
                        <ImagePreview
                            preview={preview}
                            uploading={uploadData}
                        />
                    )}
                </View> */}
                
                {!imageDims && (
                    <Card.Actions
                        style={{
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            gap: 20,
                        }}
                    >
                        <Button
                            mode='contained'
                            onPress={openSelector}
                            disabled={uploadData || selectorOpen}
                        >
                            Select Image
                        </Button>
            
                        <Button
                            mode='contained'
                            onPress={closeModal}
                            disabled={uploadData || selectorOpen}
                        >
                            Cancel
                        </Button>

                    </Card.Actions>
                )}
            </View>

        </View>
    )

    // useEffect(() => {
    
    //     if (payload) {

    //         const { uri, height, width } = payload.imageData
    //         setPreview({ uri, height, width })

    //     } else {
    //         setPreview(null)
    //     }
    // }, [payload])

    // useEffect(() => {

    //     if (preview) {

    //         setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))

    //     } else {
    //         setImageDims(null)
    //     }

    // }, [preview])

    // const uploadMemoryImage = async (memoryId, data) => {
    //     setUploading(preview)
        
    //     const memory = await addMemoryImage(memoryId, data)
        
    //     setUploading(null)

    //     if (memory) {

    //         updateMemory(memory)

    //         // socket.emit('new_memory', memory)
    //     }
    // }

    // const handleSubmit = async formData => {
        
    //     let memoryData = {
    //         ...data,
    //         ...formData,
    //         _id: data?._id || null,
    //         author: user._id,
    //         year,
    //         month,
    //         day,
    //     }

    //     // console.log('submitting form data', memoryData)

    //     let memory = await createMemory(memoryData)
        
    //     if (memory) {
    //         // console.log('new or edited memory', memory)

    //         updateMemory(memory)

    //         if (payload) {
    //             const { imageData, thumbData } = payload
                
    //             const image = { imageData, thumbData }

    //             uploadMemoryImage(memory._id, image)
    //         }

    //     }

    //     closeModal()
    // }

    // const openSelector = async () => {
    //     const uri = await openFileSelector()
        
    //     if (uri) {
    //         handleSelectedImage(uri)
    //     } else {
    //         console.log('no selection made')
    //     }
    // }

    // const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    // const handleSelectedImage = async uri => {

    //     const blob = await dataURItoBlob(uri)
        
    //     const reader = new FileReader()
        
    //     reader.onload = ({ target }) => {
    //         const exif = EXIF.readFromBinaryFile(target.result)
    //         loadImage(uri, exif, user._id)
    //     }

    //     reader.readAsArrayBuffer(blob)
    // }

    // const loadImage = async (src, exif, id) => {
        
    //     const image = new Image()
        
    //     image.onload = async () => {
    //         const data = await handleImageData(id, image, exif)
            
    //         if (data) setPayload(data)
    //         else console.log('error loading image')
    //     }

    //     image.src = src
    // }

    // return (
    //     <Card>

    //         <Card.Title
    //             title='Create Memory'
    //             titleVariant='headlineLarge'
    //             right={() => <IconButton icon='close-thick' onPress={closeModal} />}
    //         />
            
    //         <Card.Content style={{ gap: 15 }}>

    //             <DateSelector
    //                 memory={data}
    //                 onChange={value => setDate(value)}
    //             />

    //             <Form
    //                 fields={fields}
    //                 data={data}
    //                 onCancel={closeModal}
    //                 onSubmit={handleSubmit}
    //             >
                    
    //                 {preview && (
    //                     <ImagePreview
    //                         uri={preview?.uri}
    //                         uploading={uploading}
    //                     />
    //                 )}

    //                 <Button
    //                     icon={data?.image ? 'file-image-remove' : 'file-image-plus'}
    //                     mode='contained'
    //                     onPress={openSelector}
    //                     disabled={formError}
    //                 >
    //                     Add Image
    //                 </Button>
    //             </Form>
    //         </Card.Content>
    //     </Card>
    // )
}

export default MemoryImageSelector