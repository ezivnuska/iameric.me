import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { PreviewList } from './components'
import {
    SimpleButton,
    ThemedText,
    Time,
} from '@components'
import { Map } from '@modules'
import { useApp } from '@app'
import { useNotification } from '@notification'
import { uploadBipImage } from '@utils/images'
import { createBip } from '@utils/bips'

export default ({ images, onBip, onRemove, setUploading }) => {

    const { user } = useApp()
    const { addNotification } = useNotification()

    const [ items, setItems ] = useState(images)
    const [ loading, setLoading ] = useState(false)
    const [ upload, setUpload ] = useState(null)
    const [ location, setLocation ] = useState(null)
    const [ locationLoading, setLocationLoading ] = useState(false)

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
                    addNotification('Location set.')
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
        setLoading(true)
        let numUploads = 0
        while (numUploads < items.length) {
            const imageToUpload = images[numUploads]
            setUpload(numUploads)
            const uploadedImage = await uploadBipImage(bipId, imageToUpload)
            setUpload(null)

            updateItem(uploadedImage)
            numUploads++
        }
        setLoading(false)
        return numUploads
    }

    const submitBip = async () => {
        
        setLoading(true)
        
        const { latitude, longitude } = location
        const newBip = await createBip(user._id, { latitude, longitude })
        
        if (newBip) {
            if (images && images.length) {
        
                setUploading(true)
                const imagesUploaded = await uploadBipImages(newBip._id)
                setUploading(false)

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
                gap: 5,
                padding: 10,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                }}
            >
                <ThemedText color='#fff' bold>{user.username}</ThemedText>
                <Time now color='#fff' />
            </View>
            
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                {locationLoading
                    ? <ThemedText>Gathering location data...</ThemedText>
                    : location
                        ? (
                            <Map
                                coords={location}
                                color='#fff'
                                nomap
                            />
                        )
                        : <ThemedText>Could not determine location.</ThemedText>
                }

                {(loading && upload !== null) && (
                    <View
                        style={{
                            height: 30,
                            borderRadius: 8,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            marginVertical: 10,
                        }}
                    >
                        <ThemedText bold color='tomato' align='center'>
                            {`Uploading ${items.length - upload} image${items.length - upload !== 1 ? 's' : ''}`}
                        </ThemedText>
                    </View>
                )}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flexGrow: 1,
                    width: '100%',
                }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    paddingBottom: 5,
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
            </ScrollView>

            <View
                style={{
                    flexGrow: 0,
                }}
            >
                <SimpleButton
                    label='Save Bip'
                    onPress={submitBip}
                    disabled={!images || !images.length || loading}
                />

            </View>
        </View>
    )
}