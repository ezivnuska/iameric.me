import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SimpleButton } from '@components'
import { ImagePreview } from './components'
import { useUser } from '@user'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import EXIF from 'exif-js'

const ImagePicker = ({ onClose, avatar = false }) => {

    const {
        user,
        setProfileImage,
        addImage,
        setUploading,
        uploading,
    } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [avatarCheckbox, setAvatarCheckbox] = useState(!avatar)
    const [maxWidth, setMaxWidth] = useState(null)
    const [imageDims, setImageDims] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(null)

    const onLayout = e => {
        setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
    }

    useEffect(() => {
        // openSelector()
    }, [])

    useEffect(() => {
        if (preview) {
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        }
    }, [preview])

    const openSelector = async () => {
        const uri = await openFileSelector()
        if (uri) {
            handleSelectedImage(uri)
        } else {
            console.log('no selection')
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
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        }
    }, [payload])

    const onProgress = e => {
        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            console.log(`Upload Progress: ${e.loaded}/${e.total}`)
            console.log('progress', progress)
            setUploadProgress(progress)
        }
    }

    const handleUpload = async uploadData => {
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const { imageData, thumbData, userId } = uploadData
        const data = { imageData, thumbData, userId, avatar }

        setUploading(true)
        const image = await uploadImage({ ...data }, onProgress)
        setUploading(false)
        
        if (!image) {
            console.log('error uploading image')
        } else {
            addImage(image)
            if (avatarCheckbox) setProfileImage(image)
            onClose()
        }
    }

    const onPreviewLoaded = () => {
        console.log('preview loaded')
        const { imageData, thumbData, userId } = payload
        handleUpload({ imageData, thumbData, userId })
    }

    return (
        <View
            style={{
                flex: 1,
                // flexDirection: 'row',
                // alignItems: 'center',
                gap: 10,
            }}
        >
            <View
                onLayout={onLayout}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    flexGrow: 1,
                }}
            >

                {preview ? (
                    <View style={{ flex: 1 }}>

                        {imageDims && (
                            <ImagePreview
                                onLoad={onPreviewLoaded}
                                uri={preview.uri}
                                width={imageDims.width}
                                height={imageDims.height}
                                uploading={uploading}
                                progress={uploadProgress}
                            />
                        )}
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 10,
                            gap: 10,
                        }}
                    >
                        
                        <SimpleButton
                            label='Select Image'
                            onPress={openSelector}
                            disabled={uploading}
                        />

                        <SimpleButton
                            label='Cancel'
                            onPress={onClose}
                            disabled={uploading}
                            color='#fff'
                            transparent
                        />

                    </View>
                )}

            </View>

        </View>
    )
}

export default ImagePicker