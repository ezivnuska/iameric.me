import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Heading } from '@components'
import { ImageList } from './components'
import { useModal } from '@modal'
import { loadImages } from './utils'
import { ActivityIndicator } from 'react-native-paper'

export default ({ contactId }) => {
    const [images, setImages] = useState(null)

    const fetchImages = async () => {
        const contactImages = await loadImages(contactId)
        setImages(contactImages)
    } 

    useEffect(() => {
        if (contactId) fetchImages()
        else setImages(null)
    }, [contactId])
    
    return (
        <View>

            <Heading title='Images' />

            {images ? (
                <ImageList
                    images={images}
                />
            ) : <ActivityIndicator size='large' />}

        </View>
    )
}