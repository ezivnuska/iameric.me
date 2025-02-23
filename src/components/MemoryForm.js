import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, IconButton, Text } from 'react-native-paper'
import { DateSelector, Form, ImagePreview, MemoryImageSelector } from '@components'
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
    const { addModal, clearModals, closeModal } = useModal()
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

    const [memory, setMemory] = useState(null)

// useEffect(() => {
//     if (uploadData) {
//         setPreview(uploadData.preview)
//         setUploadData(null)
//     }
// }, [uploadData])

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
            setMemory(memory)

        }

        // closeModal()
    }

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

    return (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'red',
            }}
        >

            {/* <View> */}
                <Card.Title
                    title='Create Memory'
                    titleVariant='headlineMedium'
                    right={() => <IconButton icon='close-thick' onPress={closeModal} />}
                />

            {/* </View> */}

            <View
                style={{
                    flex: 1,
                    background: 'orange',
                }}
            >
                
                <View
                    style={{ flex: 1, gap: 15, borderWidth: 1, borderColor: 'yellow', flexDirection: 'row', alignItems: 'center' }}
                >
                    
                    {memory ? (
                        <View style={{ gap: 15 }}>

                            <Text variant='titleMedium'>Memory Saved!</Text>
                            <Text variant='bodyMedium'>{memory.body}</Text>

                            {!uploadData && (
                                <View>
                                    <Text variant='titleMedium'>Would you like to add an image?</Text>
                                    <MemoryImageSelector data={memory} />
                                    {/* <Button
                                        // mode='contained'
                                        onPress={clearModals}
                                    >
                                        Skip
                                    </Button>
                                    <Button
                                        mode='contained'
                                        onPress={() => addModal('MEMORY_IMAGE', memory)}
                                    >
                                        Add an Image
                                    </Button> */}
                                    {/* <MemoryImageSelector data={memory} /> */}
                                </View>
                            )
                            // : (
                            //     <ImagePreview
                            //         uri={uploadData.preview.uri}
                            //         uploading={uploading}
                            //     />
                            // )
                            }

                        </View>
                    ) : (
                        <View style={{ flex: 1, gap: 15 }}>
                            <Card>
                                <Card.Content>
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
                                </Card.Content>
                            </Card>
                        </View>
                    )}

                        
                </View>
                
            </View>
        </View>
    )
}

export default MemoryForm