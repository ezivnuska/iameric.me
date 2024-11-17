import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Heading, ImageList } from '@components'
import { useContact } from '@contact'
import { loadImages } from './utils'

const Images = ({ contactId }) => {

    const { setContactModal } = useContact()

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
                    onPress={(type, data) => setContactModal(type, data)}
                />
            ) : <ActivityIndicator size='small' />}

        </View>
    )
}

export default Images