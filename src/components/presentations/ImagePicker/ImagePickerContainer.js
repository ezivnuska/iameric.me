import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { IconButton } from '@components'
import { ImagePreview } from './components'
import ImagePickerView from './ImagePickerView'
import { useModal, useUser } from '@context'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import EXIF from 'exif-js'

const ImagePickerContainer = ({ data }) => {

    const { closeModal } = useModal()
    
    const {
        user,
        uploading,
        setProfileImage,
        setUploading,
        updateImage,
        updateUser,
    } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [avatarCheckbox, setAvatarCheckbox] = useState(data?.avatar)
    const [maxWidth, setMaxWidth] = useState(null)
    const [imageDims, setImageDims] = useState(null)
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

    const openSelector = async () => {
        
        console.log('openong image selector')

        if (!showActivity) {
            setShowActivity(true)
        }

        const uri = await openFileSelector()
        console.log('image selection complete')
        
        setShowActivity(false)
        
        if (uri) {
            console.log('image selected')
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
            
            if (!data) console.log('error loading image')
            else setPayload(data)
        }

        image.src = src
    }

    const onProgress = e => {

        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            console.log(`Upload Progress: ${e.loaded}/${e.total}`)
            console.log('progress', progress)
            setProgress(progress)
        } else {
            console.log('upload data not computable')
        }
    }

    const handleUpload = async uploadData => {

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const { imageData, thumbData, userId } = uploadData
        const data = { imageData, thumbData, userId, avatar: data?.avatar }

        // attempting upload
        setUploading(true)
        const image = await uploadImage({ ...data }, onProgress)
        setUploading(false)
        
        if (!image) {
            console.log('error uploading image')
        } else {
            console.log('image uploaded')
            updateImage(image)

            if (avatarCheckbox) updateUser({
                ...user,
                profileImage: image,
            })
            
            closeModal()
        }
    }

    const onCancel = () => {
        setShowActivity(false)
        setPayload(null)
    }

    const initUpload = () => {
        const { imageData, thumbData, userId } = payload
        handleUpload({ imageData, thumbData, userId })
    }

    return (
        <View
            onLayout={onLayout}
            style={{
                flex: 1,
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                flexGrow: 1,
                gap: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                position: 'relative',
            }}
        >

            {preview && (
                <IconButton
                    name='close'
                    onPress={onCancel}
                    size={32}
                    color='#fff'
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                />
            )}

            {imageDims ? (
                <ImagePreview
                    uri={preview?.uri}
                    width={imageDims.width}
                    height={imageDims.height}
                    upload={initUpload}
                    uploading={uploading}
                    progress={progress}
                />
            ) : (
                <ImagePickerView
                    select={openSelector}
                    cancel={closeModal}
                    disabled={uploading}
                    active={showActivity}
                />
            )}

        </View>
    )
}

export default ImagePickerContainer