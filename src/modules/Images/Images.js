import React from 'react'
import { View } from 'react-native'
import { useImages } from '@images'
import { SimpleButton } from '@components'
import { ImageList } from './components'
import { useModal } from '@modal'

export default Images = () => {

    const { images, uploading } = useImages()
    const { setModal } = useModal()

    const isDev = process.env.NODE_ENV === 'development'
    
    const restrictUpload = () => (uploading || isDev)

    const hideUpload = () => {
        return false// temp
        if (!user || restricted) return true
        switch(user.username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return true
            default:
                return false
        }
    }

    const uploadImage = () => {
        if (uploading || isDev) alert(`can't upload in dev mode`)
        else setModal('IMAGE')
    }
    
    return (
        <View
            style={{
                marginVertical: 20,
                gap: 10,
            }}
        >

            <SimpleButton
                label='Upload Image'
                onPress={uploadImage}
            />

            <ImageList
                images={images}
                loading={uploading}
                restricted={() => restrictUpload()}
            />

        </View>
    )
}