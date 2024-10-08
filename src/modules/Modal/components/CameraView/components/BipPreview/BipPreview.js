import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Animated,
    Pressable,
    View,
} from 'react-native'
import { PreviewList } from './components'
import {
    ThemedText,
    Time,
} from '@components'
import { Map } from '@modules'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useNotification } from '@notification'
import { uploadBipImage } from '@utils/images'
import { createBip } from '@utils/bips'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ images, onBip, onSubmission, onRemove, setUploading }) => {

    const { user } = useApp()
    const { closeModal } = useModal()
    const { addNotification } = useNotification()

    const [ items, setItems ] = useState(images)
    const [ loading, setLoading ] = useState(false)
    const [ upload, setUpload ] = useState(null)
    const [ location, setLocation ] = useState(null)
    const [ locationLoading, setLocationLoading ] = useState(false)

    const transition = useRef(new Animated.Value(0)).current

    const fadeIn = () => {
		Animated.timing(transition, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start()
    }

    const fadeOut = () => {
		Animated.timing(transition, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
		}).start()
    }

    const submitDisabled = useMemo(() => {
        return (!images || !images.length || loading)
    }, [images, loading])

    useEffect(() => {
        if (submitDisabled) fadeOut()
        else fadeIn()
    }, [submitDisabled])

    const updateItem = updatedItem => {
        setItems(items.map(item => {
            return item.imageData.filename === updatedItem.filename
                ? updatedItem
                : item
        }))
    }

    useEffect(() => {
        const init = async () => {
            setLocationLoading(true)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setLocation(position.coords)
                    // addNotification('Location set.')
                })
            } else {
                console.log('Geolocation is not supported by this browser.')
                setLocation(null)
            }
            setLocationLoading(false)
        }
        init()
    }, [])

    useEffect(() => {
        setItems(images)
    }, [images])

    const uploadBipImages = async bipId => {
        let numUploads = 0
        while (numUploads < items.length) {
            const imageToUpload = images[numUploads]
            setUpload(numUploads)
            const uploadedImage = await uploadBipImage(bipId, imageToUpload)
            setUpload(null)

            updateItem(uploadedImage)
            numUploads++
        }
        return numUploads
    }

    const submitBip = async () => {
        onSubmission()
        // return
        setLoading(true)
        
        const { latitude, longitude } = location
        const newBip = await createBip(user._id, { latitude, longitude })
        
        if (newBip) {
            if (images && images.length) {
                const imagesUploaded = await uploadBipImages(newBip._id)
                if (!imagesUploaded) console.log('no images uploaded')
                    
            }
            onBip(newBip)

        } else {
            console.log('Error adding new bip.')
        }
        
        setLoading(false)
    }

    return user !== null && (
        <View
            style={{
                flex: 1,
                padding: 10,
                gap: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexBasis: 'auto',
                    gap: 5,
                }}
            >
                <View
                    style={{
                        // flex: 1,
                        flexBasis: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 7,
                    }}
                >
                    {user.username && <ThemedText color='#fff' bold>{user.username}</ThemedText>}
                    
                    <Pressable
                        onPress={closeModal}
                        disabled={loading}
                        style={{
                            flex: 1,
                            flexGrow: 0,
                            flexBasis: 'auto',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 8,
                            overflow: 'hidden',
                            paddingHorizontal: 5,
                            opacity: loading ? 0 : 1,
                        }}
                    >
                        <Icon
                            name='close-sharp'
                            size={30}
                            color='#fff'
                        />
                    </Pressable>

                </View>
                <View
                    style={{
                        flexBasis: 'auto',
                        // flexGrow: 0,
                    }}
                >
                    {location
                        ? <Map coords={location} color='#fff' nomap />
                        : locationLoading
                            ? <ThemedText color='#ddd'>Gathering location data...</ThemedText>
                            : <ThemedText>Could not detect location.</ThemedText>
                    }
                </View>
                
                {(loading && upload !== null) && (
                    <View
                        style={{
                            flex: 1,
                            // flexGrow: 0,
                            height: 30,
                            borderRadius: 8,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}
                    >
                        <ThemedText bold color='tomato' align='center'>
                            {`Uploading ${items.length - upload} image${items.length - upload !== 1 ? 's' : ''}`}
                        </ThemedText>
                    </View>
                )}
            </View>
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                    flexShrink: 1,
                    width: '100%',
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                >
                    {items && items.length > 0 ? (
                        <PreviewList
                            images={items}
                            remove={onRemove}
                            uploading={upload}
                            // disabled
                            // small
                        />
                    ) : (
                        <ThemedText color='#fff'>No images captured.</ThemedText>
                    )}
                </View>

                <Animated.View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        opacity: submitDisabled ? 0 : 1,
                    }}
                >
                    <Pressable
                        onPress={submitBip}
                        disabled={submitDisabled}
                        style={{
                            flex: 1,
                            flexBasis: 'auto',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 8,
                            backgroundColor: 'tomato',
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#fff',
                            paddingHorizontal: 5,
                        }}
                    >
                        <Icon
                            name='chevron-forward-sharp'
                            size={30}
                            color='#fff'
                        />
                    </Pressable>

                </Animated.View>
            </View>
            
            
        </View>
    )
}