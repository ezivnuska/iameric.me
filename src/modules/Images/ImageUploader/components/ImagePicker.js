import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    ActivityIndicator,
    Checkbox,
    IconButtonLarge,
    ImageClone,
    SimpleButton,
    ThemedText,
} from '@components'
import EXIF from 'exif-js'
import { useUser } from '@user'
// import { useModal } from '@modal'
import { useImages } from '@images'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'

const ImagePicker = ({ avatar = false }) => {

    // const {
    //     user,
    //     setProfileImage,
    // } = useApp()

    const {
        user,
        setProfileImage,
    } = useUser()

    const {
        addImage,
        setUploading,
        uploading,
        closeImagesModal,
    } = useImages()

    const containerRef = useRef()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [avatarCheckbox, setAvatarCheckbox] = useState(avatar)
    const [imageDims, setImageDims] = useState(null)
    const [showSelectButton, setShowSelectButton] = useState(false)
    
    let timer = null

    useEffect(() => {
        openSelector()
    }, [])

    useEffect(() => {
        if (preview && containerRef.current) {
            const maxWidth = containerRef.current.clientWidth
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        }

    }, [containerRef, preview])

    const stopTimer = () => {
        clearInterval(timer)
        timer = null
        setShowSelectButton(true)
    }

    const startTimer = () => {
        timer = setInterval(stopTimer, 5000)
    }
    
    const openSelector = async () => {
        setShowSelectButton(false)
        startTimer()
        const uri = await openFileSelector()
        if (uri) handleSelectedImage(uri)
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

    useEffect(() => {
        if (!uploading && preview) setPreview(null)
    }, [uploading])

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

        closeImagesModal()
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

    const renderControls = () => {
        return (
            <View
                style={{
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >

                <Checkbox
                    label='Make profile image'
                    onChange={value => setAvatarCheckbox(value)}
                    value={avatar}
                />

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        gap: 10,
                    }}
                >

                    <IconButtonLarge
                        label='Upload'
                        name='thumbs-up-sharp'
                        onPress={onSubmit}
                        disabled={uploading}
                    />

                    <IconButtonLarge
                        label='Change'
                        name='thumbs-down'
                        onPress={handleNewSelection}
                        disabled={uploading}
                    />

                </View>
            </View>
        )
    }
    
    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row',
            }}
        >
            {(preview && imageDims) ? (
                <View style={{ flex: 1 }}>

                    <View style={{ backgroundColor: '#000' }}>
                        <ImageClone
                            source={{ uri: preview.uri }}
                            width={imageDims.width}
                            height={imageDims.height}
                            style={{
                                width: imageDims.width,
                                height: imageDims.height,
                                opacity: uploading ? 0.5 : 1,
                                marginHorizontal: 'auto',
                            }}
                        />
                    </View>

                    {renderControls()}

                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        gap: 50,
                    }}
                >
                    {showSelectButton ? (
                        <SimpleButton
                            label='Select Image'
                            onPress={openSelector}
                            disabled={uploading}
                        />
                    ) : <ActivityIndicator size='medium' label='Select Image' />}
                </View>
            )}
        </View>
    )
}

export default ImagePicker