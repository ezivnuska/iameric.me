import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, IconButton, Text } from 'react-native-paper'
import { DateSelector, Form, ImagePreview, MemoryImageSelector } from '@components'
import { useMemory, useForm, useModal, useSocket, useTheme, useUser } from '@context'
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

    const { landscape, theme } = useTheme()
    const { uploadData, updateMemory, setUploadData, setImageUpload } = useMemory()
    const { formError } = useForm()
    const { addModal, clearModals, closeModal } = useModal()
    const { socket } = useSocket()
    const { user, uploading, setUploading } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [maxDims, setMaxDims] = useState(null)
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

useEffect(() => {

    if (preview) {
        // set image dimensions to maximum size
        setImageDims(getMaxImageDims(preview.width, preview.height, maxDims))
    } else {
        setImageDims(null)
        setUploadData(null)
    }
}, [preview])

useEffect(() => {

    if (payload) {

        const { uri, height, width } = payload.imageData
        setPreview({ uri, height, width })

    } else {
        setPreview(null)
    }
}, [payload])

useEffect(() => {

    if (uploadData) {

        setImageDims(getMaxImageDims(uploadData.preview.width, uploadData.preview.height, maxDims))
    } else {
        setImageDims(null)
    }

}, [uploadData])

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
            const imageResult = await handleImageData(id, image, exif)
            if (imageResult) {
                console.log('imageResult', imageResult)
                setPayload(imageResult)

            }
            
        }

        image.src = src
    }

    const handleUpload = async () => {

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const dataToUpload = {
            memoryId: data._id,
            preview,
            ...payload,
        }

        console.log('dataToUpload', dataToUpload)
        setUploadData(dataToUpload)
        setImageUpload(payload)
        
        closeModal()
    }

    const onLayout = e => {
        setMaxDims({
            width: e.nativeEvent.target.clientWidth,
            height: e.nativeEvent.target.clientHeight,
        })
	}

    const skipImage = () => {

        setUploadData(null)
        clearModals()
    }

    return (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'red',
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                    backgroundColor: theme.colors.background,
                }}
            >
                <Text
                    variant='headlineSmall'
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >
                    New Memory
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{
                        margin: 0,
                        paddingHorizontal: 5,
                    }}
                />
            </View>


            <View
                style={{
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    gap: 15,
                    borderWidth: 1,
                    borderColor: 'yellow',
                }}
            >
                
                {memory ? (
                    <View
                        style={{
                            flex: 1,
                            gap: 15,
                            flexDirection: landscape ? 'row' : 'column',
                        }}
                    >

                        <View style={{ flex: 1, gap: 10 }}>
                            <Text variant='titleMedium'>
                                {date?.toDateString() || 'Date unknown'}
                            </Text>
                            <Text variant='bodyMedium'>{memory.body.length > 140 ? `${memory.body.substr(0, 140)}...` : memory.body}</Text>
                            <View
                                onLayout={onLayout}
                                style={{
                                    flex: 1,
                                }}
                            >
                                {imageDims && (
                                    <View style={imageDims}>
                                        <ImagePreview
                                            preview={preview}
                                            width={imageDims.width}
                                            height={imageDims.height}
                                            uploading={uploading}
                                        />
                                    </View>
                                )}
                            </View>
                        </View>

                        {!uploadData && (
                            <View
                                style={{
                                    gap: 20,
                                }}
                            >
        
                                <Button
                                    mode='outlined'
                                    onPress={openSelector}
                                    disabled={uploadData}
                                >
                                    {`${!imageDims ? 'Select' : 'Change'} Image`}
                                </Button>
        
                                <Button
                                    mode='contained-tonal'
                                    onPress={skipImage}
                                    disabled={uploadData}
                                >
                                    Skip
                                </Button>
        
                                {imageDims && (
                                    <Button
                                        mode='contained'
                                        onPress={handleUpload}
                                        disabled={uploading}
                                    >
                                        Upload Image
                                    </Button>
                                )}
        
                            </View>
                        )}

                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            gap: 15,
                            flexDirection: landscape ? 'row' : 'column',
                        }}
                    >
                        <View
                            style={{
                                flex: (landscape && 1),
                                // gap: 15,
                            }}
                        >
                            <Text variant='titleLarge'>
                                {date?.toDateString() || 'date unknown'}
                            </Text>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                gap: 15,
                            }}
                        >
                            <DateSelector
                                memory={data}
                                onChange={value => setDate(value)}
                            />
                            
                            <View
                                style={{
                                    flex: 1,
                                    background: 'green',
                                }}
                            >
                                <Form
                                    fields={fields}
                                    data={data}
                                    onCancel={closeModal}
                                    onSubmit={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                )}
                
            </View>
        </View>
    )
}

export default MemoryForm