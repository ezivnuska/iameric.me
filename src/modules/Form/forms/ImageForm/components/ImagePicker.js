import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ImageClone,
    SimpleButton,
} from '@components'
import { Checkbox } from '@forms/components'
import EXIF from 'exif-js'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useImages } from '@images'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import { ActivityIndicator } from 'react-native-paper'

export default ImagePicker = () => {

    const {
        user,
        setProfileImage,
    } = useApp()

    const {
        addImage,
        setUploading,
        uploading,
    } = useImages()

    const { closeModal } = useModal()

    const containerRef = useRef()

    // const [size, setSize] = useState(initialSize)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [ready, setReady] = useState(false)
    const [timer, setTimer] = useState(null)
    const [avatarCheckbox, setAvatarCheckbox] = useState(false)
    const [imageDims, setImageDims] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            setTimer(setInterval(() => {
                setReady(true)
                setTimer(null)
            }, 2000))
            await openSelector(user._id)
        }
        init()
    }, [])

    useEffect(() => {
        if (preview && containerRef.current) {
            const maxWidth = containerRef.current.clientWidth
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        }

    }, [containerRef, preview])
    
    const openSelector = async id => {
        const uri = await openFileSelector()
        if (uri) {
            handleSelectedImage(uri, id)
        }
    }

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
        }
    }, [payload])

    const handleUpload = async imageData => {
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        setUploading(true)
        const image = await uploadImage({ ...imageData, avatar: avatarCheckbox })
        setUploading(false)
        
        if (!image) console.log('error uploading image')
        else {
            addImage(image)
            if (avatarCheckbox) setProfileImage(image)
        }

        closeModal()
    }

    const onSubmit = async () => {
        if (!payload) console.log('no image data to submit.')
        else {
            const { imageData, thumbData, userId } = payload
            handleUpload({ imageData, thumbData, userId })
            setPayload(null)
        }
    }

    const handleNewSelection = () => {
        setPreview(null)
        openSelector()
    }

    if (uploading) return <ActivityIndicator size='medium' />
    
    return preview ? (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                gap: 10,
            }}
        >
            <View
                ref={containerRef}
                style={{
                    gap: 10,
                    flexGrow: 1,
                }}
            >
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

                <Checkbox
                    label='Make profile image'
                    onChange={value => setAvatarCheckbox(value)}
                />

            </View>

            <View
                style={{
                    flexGrow: 0,
                    // justifyContent: 'space-evenly',
                    gap: 10,
                }}
            >
                <IconButton
                    name='thumbs-up-sharp'
                    onPress={onSubmit}
                    disabled={uploading}
                    style={{ padding: 3 }}
                />

                <IconButton
                    name='thumbs-down-sharp'
                    onPress={handleNewSelection}
                    disabled={uploading}
                    style={{ padding: 3 }}
                />

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