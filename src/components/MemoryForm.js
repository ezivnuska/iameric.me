import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { DateSelector, Form, ImagePreview } from '@components'
import { useMemory, useForm, useModal, useSocket, useUser } from '@context'
import { createMemory } from '@utils/memories'

import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
} from '@utils/images'
import EXIF from 'exif-js'
import {
    getDate,
    getDay,
    getMonth,
    getYear,
    endOfDay,
    format,
    formatDistance,
    formatRelative,
    subDays,
    getDaysInMonth,
    parseISO,
} from 'date-fns'

const MemoryForm = ({ data = null }) => {

    const fields = [
        {
            name: 'body',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { updateMemory } = useMemory()
    const { formError } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { user, uploading, setUploading } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [maxWidth, setMaxWidth] = useState(200)
    const [imageDims, setImageDims] = useState(null)
    const [memory, setMemory] = useState(data)
    const [date, setDate] = useState(null)

    const year = useMemo(() => date && getYear(date), [date])
    const month = useMemo(() => date && getMonth(date), [date])
    const day = useMemo(() => date && getDate(date), [date])

    // useEffect(() => {
    
    //     if (data) {
            
    //     }
    // }, [])

    useEffect(() => {
    
        // if image is loaded and data is available
        if (payload) {

            // set preview from available data
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })

        } else {
            setPreview(null)
        }
    }, [payload])

    useEffect(() => {

        // if image selected and preview available
        if (preview) {

            // set image dimensions to maximum size
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))

        } else {
            setImageDims(null)
        }

    }, [preview])

    // useEffect(() => {
    //     if (imageUpload) {
    //         if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
    //         setUploading(preview)
    //         // setImageUpload(null)
    //     }
        
    // }, [imageUpload])

    // useEffect(() => {
    //     if (uploadedImage) {
    //         setNewPost({
    //             ...newPost,
    //             images: [uploadedImage._id]
    //             // images: [...newPost.images, uploadedImage._id]
    //         })
    //         setUploadedImage(null)
    //     }
    // }, [uploadedImage])

    // const initUpload = () => {
    //     const { imageData, thumbData, userId } = payload
    //     const data = { imageData, thumbData, userId }
    //     setImageUpload(data)
    //     // handleUpload({ imageData, thumbData, userId })
    // }

    // const handleUpload = async () => {

    //     if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')

    //     const { imageData, thumbData, userId } = payload
    //     const data = { imageData, thumbData, userId }

    //     setImageUpload(data)

    //     setUploading(preview)
            
    //     // closeModal()
    // }

    const handleSubmit = async formData => {
        
        let memoryData = {
            ...formData,
            author: user._id,
            year,
            month,
            day,
            threadId: memory?._id || null,
        }
        
        if (memory?.image) {
            console.log('memory:image', memory.image)
        } else if (payload) {
            const { imageData, thumbData } = payload
            
            memoryData.image = { imageData, thumbData }

            setUploading(preview)
        }

        console.log('submitting form data', memoryData)

        const memory = await createMemory(memoryData)
        
        setUploading(null)

        if (memory) {
            socket.emit('new_memory', memory)

            updateMemory(memory)
        }

        closeModal()
    }

    const openSelector = async () => {
        const uri = await openFileSelector()
        
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
            const data = await handleImageData(id, image, exif)
            
            if (data) setPayload(data)
            else console.log('error loading image')
        }

        image.src = src
    }

    return (
        <Card>

            <Card.Title
                title='Create Memory'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title='Share something.'
                    titleVariant='headlineSmall'
                    // subtitle=''
                    // subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        title='Say Something'
                        fields={fields}
                        data={memory}
                        onCancel={closeModal}
                        onSubmit={handleSubmit}
                    >
                        <DateSelector
                            memory={memory}
                            onChange={value => setDate(value)}
                        />
                        
                        {preview && (
                            <ImagePreview
                                uri={preview?.uri}
                                uploading={uploading}
                            />
                        )}
                        {memory?.image ? (
                            <Button
                                icon='file-image-remove'
                                mode='contained'
                                onPress={() => setMemory({
                                    ...memory,
                                    image: null,
                                })}
                                disabled={formError}
                            >
                                Remove Image
                            </Button>
                        ) : (
                            <Button
                                icon='file-image-plus'
                                mode='contained'
                                onPress={openSelector}
                                disabled={formError}
                            >
                                Add Image
                            </Button>
                        )}
                    </Form>
                </Card.Content>
            </Card>
        </Card>
    )
}

export default MemoryForm