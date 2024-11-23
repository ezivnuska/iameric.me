import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, Checkbox, IconButtonLarge, ImageClone, ImageContainer, ProfileImage, SimpleButton, ThemedText } from '@components'
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

const ImagePicker = ({ avatar = false, onComplete = null }) => {

    const {
        user,
        setProfileImage,
        addImage,
        setUploading,
        uploading,
    } = useUser()

    const containerRef = useRef()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [ready, setReady] = useState(false)
    const [avatarCheckbox, setAvatarCheckbox] = useState(!avatar)
    const [imageDims, setImageDims] = useState(null)
    
    let timer = null

    const startTimer = () => {
        setReady(false)
        openSelector()
        timer = setInterval(() => stopTimer, 2000)
    }

    const stopTimer = () => {
        setReady(true)
        timer = undefined
    }

    useEffect(() => {
        const init = async () => {
            startTimer()
        }
        init()
        // openSelector()
        return () => setUploading(false)
    }, [])

    useEffect(() => {
        if (preview && containerRef.current) {
            const maxWidth = containerRef.current.clientWidth
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        } else {
            setReady(false)
        }

    }, [containerRef, preview])

    const [controlsVisible, setControlsVisible] = useState(true)

    const controlOpacity = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: controlOpacity.value,
    }))
    
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
        if (payload) {
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        } else if (preview) {
            setPreview(null)
            onComplete()
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
        
        setPayload(null)
    }

    const onSubmit = async () => {
        if (!payload) console.log('no image data to submit.')
        else {
            const { imageData, thumbData, userId } = payload
            handleUpload({ imageData, thumbData, userId })
        }
    }

    const handleNewSelection = () => {
        setPreview(null)
        openSelector()
    }

    const handleControls = () => {
        if (controlsVisible) {
            controlOpacity.value = withTiming(0, { duration: 500 }, () => setControlsVisible(false))
        } else {
            setControlsVisible(true)
            controlOpacity.value = withTiming(1, { duration: 500 })
        }
    }

    const renderControls = () => (
        <View style={{ padding: 10, zIndex: 100 }}>

            {avatar && (
                <Checkbox
                    label='Make profile image'
                    onChange={value => setAvatarCheckbox(value)}
                    value={avatar}
                />
            )}

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    gap: 10,
                }}
            >
                <Pressable
                    onPress={onSubmit}
                    disabled={uploading}
                    style={{
                        flex: 1,
                        borderRadius: 12,
                        overflow: 'hidden',
                        backgroundColor: uploading ? '#ccc' : 'tomato',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        height: 40,
                    }}
                >
                    <Icon
                        name='thumbs-up-sharp'
                        size={20}
                        color='#fff'
                        style={{ padding: 3 }}
                    />
                    <ThemedText color='#fff' size={20} bold>Upload</ThemedText>
                </Pressable>

                <Pressable
                    onPress={handleNewSelection}
                    disabled={uploading}
                    style={{
                        flex: 1,
                        borderRadius: 12,
                        overflow: 'hidden',
                        backgroundColor: uploading ? '#ccc' : '#aaa',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: '#aaa',
                        gap: 10,
                        height: 40,
                    }}
                >
                    <Icon
                        name='thumbs-down'
                        size={20}
                        color='#fff'
                        style={{ padding: 3 }}
                    />
                    <ThemedText color='#fff' size={20} bold>Change</ThemedText>
                </Pressable>

            </View>
        </View>
    )
    
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
                ref={containerRef}
                style={{
                    gap: 10,
                    flexGrow: 1,
                }}
            >
                {imageDims && (
                    <View
                        style={{
                            flex: 1,
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            width: '100%',
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

                        {preview ? (
                            <View
                                style={{
                                    flex: 1,
                                    position: 'relative',
                                }}
                            >
            
                                <Pressable
                                    onPress={handleControls}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                    }}
                                >
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
                                    {/* <ImageContainer image={preview} /> */}
                                </Pressable>
            
                                <Animated.View
                                    style={[{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        display: controlsVisible ? 'block' : 'none',
                                        zIndex: 100,
                                    }, animatedStyle]}
                                >
                                    <LinearGradient
                                        colors={[
                                            'rgba(0, 0, 0, 1.0)',
                                            'rgba(0, 0, 0, 0.6)',
                                            'rgba(0, 0, 0, 0.3)',
                                            'rgba(0, 0, 0, 0.1)',
                                            'rgba(0, 0, 0, 0.0)',
                                        ]}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 100,
                                            zIndex: 50,
                                        }}
                                    />
            
                                    <IconButtonLarge
                                        name='close'
                                        onPress={onComplete}
                                        size={40}
                                        color='#fff'
                                        transparent
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            zIndex: 100,
                                        }}
                                    />
            
                                </Animated.View>
            
                                <Animated.View
                                    style={[{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        display: controlsVisible ? 'block' : 'none',
                                        zIndex: 101,
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    }, animatedStyle]}
                                >
                                    {renderControls()}
                                    {/* <ImageControlPanel
                                        image={image}
                                        onClose={onClose}
                                    /> */}
                                </Animated.View>
                                
                            </View>
                            // <View
                            //     style={{
                            //         flex: 1,
                            //         flexShrink: 1,
                            //         zIndex: 10,
                            //     }}
                            // >
                            //     <View
                            //         style={{
                            //             flexDirection: 'row',
                            //             alignItems: 'center',
                            //             justifyContent: 'center',
                            //             zIndex: 10,
                            //         }}
                            //     >
                            //         <ImageClone
                            //             source={{ uri: preview.uri }}
                            //             width={imageDims.width}
                            //             height={imageDims.height}
                            //             style={{
                            //                 borderWidth: 1,
                            //                 width: imageDims.width,
                            //                 height: imageDims.height,
                            //             }}
                            //         />
                            //     </View>

                            //     {renderControls()}
                            // </View>
                        ) : (        
                            <SimpleButton
                                label='Select Image'
                                onPress={openSelector}
                                disabled={uploading || !ready}
                            />
                        )}
                    </View>
                )}

            </View>

        </View>
    )
}

export default ImagePicker