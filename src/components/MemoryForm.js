import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { DateSelector, Form } from '@components'
import { useMemory, useForm, useModal, useSocket, useTheme, useUser } from '@context'
import { handleImageData, openFileSelector, uploadImage } from '@utils/images'
import { addMemoryImage, createMemory } from '@utils/memories'
import { getDate, getMonth, getYear } from 'date-fns'
import EXIF from 'exif-js'

const MemoryForm = ({ data = null }) => {

    const fields = [
        {
            name: 'body',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { landscape, theme } = useTheme()
    const { addMemory, updateMemory } = useMemory()
    const { formError } = useForm()
    const { clearModals, closeModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    const [payload, setPayload] = useState(null)
    const [date, setDate] = useState(null)

    const year = useMemo(() => date && getYear(date), [date])
    const month = useMemo(() => date && getMonth(date), [date])
    const day = useMemo(() => date && getDate(date), [date])

    const [memory, setMemory] = useState(null)

    useEffect(() => {
        if (memory && memory.image) {
            clearModals()
        }
    }, [memory])

    useEffect(() => {

        if (payload) {

            const { uri, height, width } = payload.imageData

            updateMemory({
                _id: memory._id,
                image: { uri, height, width },
            })
            
            handleUpload(payload)
            
            setPayload(null)
            
            closeModal()
        }
    }, [payload])

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

        let newMemory = await createMemory(memoryData)
        
        if (newMemory) {
            addMemory(newMemory)
            setMemory(newMemory)
        }
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
                setPayload(imageResult)
            }
            
        }

        image.src = src
    }

    const handleUpload = async imagePayload => {

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const image = await uploadImage(imagePayload)

        const { imageData, thumbData } = imagePayload

        if (image) {
            
            const memoryWithImage = await addMemoryImage(memory._id, { imageData, thumbData })
            
            if (memoryWithImage) {
                updateMemory(memoryWithImage)
            }
        }
        
        closeModal()
    }

    return (
        <View style={{ flex: 1 }}>

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
                    {`${memory ? 'Edit' : 'New'} Memory`}
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{
                        margin: 0,
                        paddingHorizontal: 10,
                    }}
                />
            </View>


            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    gap: 15,
                    // borderWidth: 1,
                    // borderColor: 'yellow',
                }}
            >
                
                {memory ? (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            gap: 15,
                        }}
                    >
    
                        <Button
                            mode='contained'
                            onPress={openSelector}
                        >
                            Add Image
                        </Button>

                        <Button
                            mode='text'
                            onPress={clearModals}
                        >
                            Skip
                        </Button>

                    </View>
                ) : (
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

                        <Form
                            fields={fields}
                            data={data}
                            onCancel={closeModal}
                            onSubmit={handleSubmit}
                        />

                    </View>
                )}
                
            </View>
        </View>
    )
}

export default MemoryForm