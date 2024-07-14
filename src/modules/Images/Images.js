import React from 'react'
import { View } from 'react-native'
import { ImageList } from './components'
import { useImages } from '@images'
import { useModal } from '@modal'

export default Images = () => {

    const { images, uploading } = useImages()
    const { setModal } = useModal()
    
    return (
        <View style={{ marginVertical: 20  }}>

            <ImageList
                images={images}
                loading={uploading}
                upload={() => setModal('IMAGE')}
            />

        </View>
    )
}