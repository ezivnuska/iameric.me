import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, Checkbox, IconButtonLarge, ImageClone, ImageContainer, ProfileImage, SimpleButton, DefaultText } from '@components'
import { useUser } from '@context'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import EXIF from 'exif-js'

const ImagePickerMini = ({ onSelection, avatar = false }) => {

    const {
        user,
        setProfileImage,
        addImage,
        setUploading,
        uploading,
    } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [maxWidth, setMaxWidth] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        if (preview) {
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        }
    }, [preview])

    const onLayout = e => {
        setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
    }
    
    const openSelector = async () => {
        const uri = await openFileSelector()
        if (uri) {
            handleSelectedImage(uri)
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
            if (!data) console.log('error loading image')
            else setPayload(data)
        }
        image.src = src
    }

    useEffect(() => {
        console.log('payload', payload)
        if (payload) {
            
            const { uri, height, width } = payload.imageData
            
            setPreview({ uri, height, width })

            onSelection(payload)
            // handleUpload({ imageData, thumbData, userId })
        } else {
        // if (preview) {
            if (preview) setPreview(null)
        }
    }, [payload])

    // const handleUpload = async imageData => {
    //     if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
    //     setUploading(true)
    //     const image = await uploadImage({ ...imageData, avatar: avatarCheckbox })
    //     setUploading(false)
        
    //     if (!image) console.log('error uploading image')
    //     else {
    //         addImage(image)
    //         if (avatarCheckbox) setProfileImage(image)
    //     }
        
    //     setPayload(null)
    // }

    // const onSubmit = async () => {
    //     if (!payload) console.log('no image data to submit.')
    //     else {
    //         const { imageData, thumbData, userId } = payload
    //         // onComplete({ imageData, thumbData, userId })
    //         handleUpload({ imageData, thumbData, userId })
    //     }
    // }
    
    return (
        <View style={{ flex: 1, gap: 10 }}>

            <View
                onLayout={onLayout}
                style={{ gap: 10, flexGrow: 1 }}
            >

                {preview ? (
                    <View style={{ flex: 1, width: '100%', position: 'relative' }}>
                        
                        {uploading && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 100,
                                }}
                            >
                                <ActivityIndicator
                                    size='medium'
                                    label={`Uploading...\nDo not close window.`}
                                />
                            </View>
                        )}

                        <View style={{ flex: 1 }}>

                            {imageDims && (        
                                <ImageClone
                                    source={{ uri: preview.uri }}
                                    width={imageDims.width}
                                    height={imageDims.height}
                                    style={{
                                        borderWidth: 1,
                                        width: imageDims.width,
                                        height: imageDims.height,
                                    }}
                                />
                            )}
            
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 100,
                                }}
                            >
                                <IconButtonLarge
                                    name='close'
                                    onPress={() => setPayload(null)}
                                    size={40}
                                    color='#fff'
                                    transparent
                                    style={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 100,
                                    }}
                                />
        
                            </View>

                        </View>

                    </View>
                ) : (
                    <SimpleButton
                        label='Add Image'
                        onPress={openSelector}
                    />
                )}

            </View>

        </View>
    )
}

export default ImagePickerMini