import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, Checkbox, IconButtonLarge, ImageClone, ImageContainer, ProfileImage, SimpleButton, DefaultText } from '@components'
import { useUser } from '@user'
import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
    uploadImage,
} from '@utils/images'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import EXIF from 'exif-js'
import LinearGradient from 'react-native-web-linear-gradient'

const ImagePicker = ({ onClose, avatar = false }) => {

    const {
        user,
        setProfileImage,
        addImage,
        setUploading,
        uploading,
    } = useUser()

    // const containerRef = useRef()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [ready, setReady] = useState(false)
    const [avatarCheckbox, setAvatarCheckbox] = useState(!avatar)
    const [maxWidth, setMaxWidth] = useState(null)
    const [imageDims, setImageDims] = useState(null)
    
    let timer = null

    // const startTimer = () => {
    //     setReady(false)
    //     timer = setInterval(stopTimer, 2000)
    // }

    // const stopTimer = () => {
    //     setReady(true)
    //     timer = undefined
    // }

    // useEffect(() => {
    //     // console.log('ready', ready)
    //     console.log('payload', payload)
    //     console.log('preview', preview)
    //     openSelector()
    //     // startTimer()
    // }, [])

    // useEffect(() => {
    //     if (preview && containerRef.current) {
    //         const maxWidth = containerRef.current.clientWidth
    //         setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
    //     }

    // }, [containerRef, preview])

    // useEffect(() => {
    //     startTimer()
    // }, [])

    const onLayout = e => {
        setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
    }

    useEffect(() => {
        if (preview) {
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        }
    }, [preview])

    const [controlsVisible, setControlsVisible] = useState(true)

    const controlOpacity = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: controlOpacity.value,
    }))

    useEffect(() => {
        if (!uploading) openSelector()
    }, [])
    
    const openSelector = async () => {
        console.log('open selector')
        const uri = await openFileSelector()
        console.log('selector complete')
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
            else {
                setPayload(data)
            }
        }
        image.src = src
    }

    useEffect(() => {
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
            // handleUpload({ imageData, thumbData, userId })
            // onSelection(payload)
        }
        //  else if (preview) {
        //     setPreview(null)
        // }
    }, [payload])

    const handleUpload = async payload => {
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const { imageData, thumbData, userId } = payload
        const data = { imageData, thumbData, userId }
        setUploading(true)
        const image = await uploadImage({ ...data })
        // const image = await uploadImage({ ...data, avatar: avatarCheckbox })
        setUploading(false)
        
        if (!image) console.log('error uploading image')
        else {
            addImage(image)
            if (avatarCheckbox) setProfileImage(image)
        }

        // setPayload(null)
        onClose()
        
    }

    // const onSubmit = async () => {
    //     if (!payload) console.log('no image data to submit.')
    //     else {
    //         const { imageData, thumbData, userId } = payload
    //         handleUpload({ imageData, thumbData, userId })
    //     }
    // }

    // const handleNewSelection = () => {
    //     setPreview(null)
    //     openSelector()
    // }

    // const handleControls = () => {
    //     if (controlsVisible) {
    //         controlOpacity.value = withTiming(0, { duration: 500 }, () => setControlsVisible(false))
    //     } else {
    //         setControlsVisible(true)
    //         controlOpacity.value = withTiming(1, { duration: 500 })
    //     }
    // }

    // const renderControls = () => (
    //     <View style={{ padding: 10, zIndex: 100 }}>

    //         {avatar && (
    //             <Checkbox
    //                 label='Make profile image'
    //                 onChange={value => setAvatarCheckbox(value)}
    //                 value={avatar}
    //             />
    //         )}

    //         <View
    //             style={{
    //                 flex: 1,
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-evenly',
    //                 gap: 10,
    //             }}
    //         >
    //             <Pressable
    //                 onPress={onSubmit}
    //                 disabled={uploading}
    //                 style={{
    //                     flex: 1,
    //                     borderRadius: 12,
    //                     overflow: 'hidden',
    //                     backgroundColor: uploading ? '#ccc' : 'tomato',
    //                     flexDirection: 'row',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     gap: 10,
    //                     height: 40,
    //                 }}
    //             >
    //                 <Icon
    //                     name='thumbs-up-sharp'
    //                     size={20}
    //                     color='#fff'
    //                     style={{ padding: 3 }}
    //                 />
    //                 <DefaultText color='#fff' size={20} bold>Upload</DefaultText>
    //             </Pressable>

    //             <Pressable
    //                 onPress={handleNewSelection}
    //                 disabled={uploading}
    //                 style={{
    //                     flex: 1,
    //                     borderRadius: 12,
    //                     overflow: 'hidden',
    //                     backgroundColor: uploading ? '#ccc' : '#aaa',
    //                     flexDirection: 'row',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     // borderWidth: 1,
    //                     // borderColor: '#aaa',
    //                     gap: 10,
    //                     height: 40,
    //                 }}
    //             >
    //                 <Icon
    //                     name='thumbs-down'
    //                     size={20}
    //                     color='#fff'
    //                     style={{ padding: 3 }}
    //                 />
    //                 <DefaultText color='#fff' size={20} bold>Change</DefaultText>
    //             </Pressable>

    //         </View>
    //     </View>
    // )
    
    // if (uploading) return <ActivityIndicator size='medium' label='Uploading...' color='#fff' />

    const onPreviewLoaded = () => {
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
                        
                {/* {uploading && (
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
                )} */}

                {imageDims ? (
                    <View style={{ flex: 1 }}>

                        {preview ? (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                            >

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

                                <ImageClone
                                    onLayout={onPreviewLoaded}
                                    source={{ uri: preview.uri }}
                                    width={imageDims.width}
                                    height={imageDims.height}
                                    style={{
                                        borderWidth: 1,
                                        width: imageDims.width,
                                        height: imageDims.height,
                                        zIndex: 10,
                                    }}
                                />

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
                ) : <ActivityIndicator size='medium' color='tomato' />}

            </View>

        </View>
    )
}

export default ImagePicker