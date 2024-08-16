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

export default ({ images, onBip, onClear }) => {

    const { user } = useApp()

    const [ items, setItems ] = useState(images)
    const [ loading, setLoading ] = useState(false)
    const [ uploading, setUploading ] = useState(false)

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
            setUploading(numUploads)
            const uploadedImage = await uploadBipImage(bipId, imageToUpload)
            setUploading(null)

            updateItem(uploadedImage)
            numUploads++
        }
        return numUploads
    }

    const submitBip = async () => {
        setLoading(true)
        const newBip = await createBip(user._id, user.location)
        if (!newBip) console.log('Error adding new bip.')
        else {
            if (images && images.length) {
                
                const imagesUploaded = await uploadBipImages(newBip._id)

                if (!imagesUploaded) console.log('no images uploaded')
                onBip(newBip)
            }
        }
        setLoading(false)
    }

    return (
        <View style={{ flexGrow: 0 }}>

            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 10,
                }}
            >
                <ThemedText>{user.username}</ThemedText>
                <Time now />
            </View>

            {items && items.length > 0 && (
                <ImageList
                    images={items}
                    uploading={uploading}
                    // disabled
                    // small
                />
            )}
            
            <View
                style={{
                    marginVertical: 10,
                    gap: 10,
                }}
            >
                <SimpleButton
                    label={images && images.length ? 'Submit with Images' : 'Submit without Images'}
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