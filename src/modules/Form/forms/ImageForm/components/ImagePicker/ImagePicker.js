import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ImageClone,
    SimpleButton,
} from '@components'
import { Checkbox } from '@forms/components'
import EXIF from 'exif-js'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useImages } from '@images'
import {
    handleImageData,
    openFileSelector,
    uploadImage,
} from './utils'
// import { getMaxAvailableImageSize } from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

const initialSize = 280

export default ImagePicker = () => {

    const {
        dims,
        theme,
        user,
    } = useApp()

    const {
        addImage,
        setUploading,
        uploading,
    } = useImages()

    const { closeModal } = useModal()

    // const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [ready, setReady] = useState(false)
    // let timer
    const imageDims = useMemo(() => preview && getMaxImageDims(preview.width, preview.height, dims.width * 0.7, 300), [dims, preview])

    useEffect(() => {
        const init = async () => {
            // setUploading(true)
            await openSelector(user._id)
            setReady(true)
        }
        // timer = setInterval(() => {
        //     timer = null
        //     setReady(true)
        // }, 2000)
        init()
    }, [])
    
    const openSelector = async id => {
        const uri = await openFileSelector()
        if (uri) {
            // console.log('image selected', uri)
            handleSelectedImage(uri, id)
        }
    }
    
    // useEffect(() => {
    //     const dropzone = document.getElementById('dropzone')
    //     if (dropzone) {
    //         const maxWidth = size
    //         const actualWidth = dropzone.offsetWidth
    //         const width = actualWidth > maxWidth ? maxWidth : actualWidth
    //         setSize(width)
    //     }
    // }, [dims])

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleSelectedImage = async (uri, id) => {
        const blob = await dataURItoBlob(uri)
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif, id)
        }
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif, id) => {
        const image = new Image()
        image.onload = async () => {
            const data = await handleImageData(id, image, exif)
            // setUploading(false)
            if (!data) console.log('error loading image')
            else setPayload(data)
        }
        image.src = src
    }

    useEffect(() => {
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        } else if (preview) {
            setPreview(null)
            // closeModal()
        }
    }, [payload])

    const handleUpload = async imageData => {
        if (process.env.NODE_ENV === 'development') return alert('cant upload in dev')
        
        setUploading(true)
        const image = await uploadImage(imageData)
        setUploading(false)
        
        if (!image) console.log('error uploading image')
        else addImage(image)

        closeModal()
    }

    const onSubmit = async () => {
        if (!payload) console.log('no image data to submit.')
        else {
            const { imageData, thumbData, userId } = payload
            handleUpload({ imageData, thumbData, userId })
            // console.log('submitting', payload)
            setPayload(null)
        }
    }

    if (uploading) return <ActivityIndicator size='large' />
    
    return preview ? (
        <View
            // id='dropzone'
            style={{
                flexDirection: 'row',
                // flexWrap: 'wrap',
                gap: 10,
            }}
        >
            <View
                // style={{
                //     flexGrow: 1,
                // }}
            >
                <ImageClone
                    width={imageDims.width}
                    height={imageDims.height}
                    style={{
                        width: imageDims.width,
                        height: imageDims.height,
                        resizeMode: 'cover',
                        borderWidth: 1,
                    }}
                    source={{ uri: preview.uri }}
                />
                <Checkbox
                    label='Make profile image'
                    onChange={value => {
                        //append value to request...
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexShrink: 1,
                    flexGrow: 0,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 10,
                    }}
                >
                    <Pressable
                        onPress={onSubmit}
                        disabled={uploading}
                    >
                        <Icon
                            name='cloud-upload-outline'
                            size={24}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>

                    <Pressable
                        onPress={openSelector}
                        disabled={uploading}
                    >
                        <Icon
                            name='arrow-undo-outline'
                            size={24}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>

                </View>
            </View>
        </View>
    ) : (
        <SimpleButton
            label='Select Image'
            onPress={openSelector}
            disabled={uploading || !ready}
        />
    )
}