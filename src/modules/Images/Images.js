import React from 'react'
import { View } from 'react-native'
import { useImages } from '@images'
import { ImageList } from './components'

export default Images = () => {

    const { images, uploading } = useImages()
    
    return (
        <View
            style={{
                marginVertical: 20,
            }}
        >
            <ImageList images={images} loading={uploading} />
        </View>
    )
}