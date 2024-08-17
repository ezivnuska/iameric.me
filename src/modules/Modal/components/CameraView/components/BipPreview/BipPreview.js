import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import ImageList from './components/ImageList'
import {
    SimpleButton,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
import { uploadBipImage } from '@utils/images'
import { createBip } from '@utils/bips'

export default ({ images, onBip, onClear, setUploading }) => {

    const { user } = useApp()

    const [ items, setItems ] = useState(images)
    const [ loading, setLoading ] = useState(false)
    const [ upload, setUpload ] = useState(null)

    const updateItem = updatedItem => {
        setItems(items.map(item => {
            return item.imageData.filename === updatedItem.filename
                ? updatedItem
                : item
        }))
    }

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
        
        setLoading(true)
        
        const newBip = await createBip(user._id, user.location)
        
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

    return (
        <View
            style={{
                flex: 1,
                gap: 15,
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <ThemedText>{user.username}</ThemedText>
                <Time now />
            </View>

            <View style={{ flexGrow: 1 }}>

                {items && items.length > 0 ? (
                    <>
                        <ImageList
                            images={items}
                            uploading={upload}
                            // disabled
                            // small
                        />

                        {(loading && upload !== null) && (
                            <ThemedText bold color='tomato'>
                                {`Uploading ${items.length - upload} image${items.length - upload !== 1 ? 's' : ''}`}
                            </ThemedText>
                        )}
                    </>
                ) : (
                    <ThemedText>No images captured.</ThemedText>
                )}


            </View>

            <View
                style={{
                    // marginVertical: 10,
                    gap: 10,
                }}
            >
                <SimpleButton
                    label='Report Bip'
                    onPress={submitBip}
                    disabled={loading}
                />

                <SimpleButton
                    label={items.length ? 'Clear' : 'Close'}
                    onPress={onClear}
                    disabled={loading}
                />

            </View>
        </View>
    )
}