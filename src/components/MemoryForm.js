import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { DateSelector, Form, ImagePreview } from '@components'
import { useMemory, useForm, useModal, useSocket, useUser } from '@context'
import { addMemoryImage, createMemory } from '@utils/memories'
import { getMaxImageDims, handleImageData, openFileSelector } from '@utils/images'
import EXIF from 'exif-js'
import { getDate, getMonth, getYear } from 'date-fns'

const MemoryForm = ({ data = null }) => {

    const fields = [
        {
            name: 'body',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { uploadData, updateMemory, setUploadData } = useMemory()
    const { formError } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { user, uploading, setUploading } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [maxWidth, setMaxWidth] = useState(200)
    const [imageDims, setImageDims] = useState(null)
    const [date, setDate] = useState(null)

    const year = useMemo(() => date && getYear(date), [date])
    const month = useMemo(() => date && getMonth(date), [date])
    const day = useMemo(() => date && getDate(date), [date])

    useEffect(() => {
        if (uploadData) {
            setPreview(uploadData.preview)
            setUploadData(null)
        }
    }, [uploadData])

    useEffect(() => {
    
        if (payload) {

            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })

        } else {
            setPreview(null)
        }
    }, [payload])

    useEffect(() => {

        if (preview) {

            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))

        } else {
            setImageDims(null)
        }

    }, [preview])

    // const uploadMemoryImage = async (memoryId, data) => {
    //     setUploading(preview)
        
    //     const memory = await addMemoryImage(memoryId, data)
        
    //     setUploading(null)

    //     if (memory) {

    //         updateMemory(memory)

    //         // socket.emit('new_memory', memory)
    //     }
    // }

    const handleSubmit = async formData => {
        
        let memoryData = {
            ...data,
            ...formData,
            _id: data?._id || null,
            author: user._id,
            year,
            month,
            day,
        }

        // console.log('submitting form data', memoryData)

        let memory = await createMemory(memoryData)
        
        if (memory) {
        //     // console.log('new or edited memory', memory)

            updateMemory(memory)

        //     if (payload) {
        //         const { imageData, thumbData } = payload
                
        //         const image = { imageData, thumbData }

        //         uploadMemoryImage(memory._id, image)
        //     }

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
            
            <Card.Content style={{ gap: 15 }}>

                <DateSelector
                    memory={data}
                    onChange={value => setDate(value)}
                />

                <Form
                    fields={fields}
                    data={data}
                    onCancel={closeModal}
                    onSubmit={handleSubmit}
                />
                    
                    {/* {preview && (
                        <ImagePreview
                            uri={preview?.uri}
                            uploading={uploading}
                        />
                    )}

                    <Button
                        icon={data?.image ? 'file-image-remove' : 'file-image-plus'}
                        mode='contained'
                        onPress={openSelector}
                        disabled={formError}
                    >
                        Add Image
                    </Button>
                </Form> */}
            </Card.Content>
        </Card>
    )
}

export default MemoryForm