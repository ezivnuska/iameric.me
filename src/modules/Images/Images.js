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
    
    // const isRestricted = () => (uploading || isDev)

    // const hideUpload = () => {
    //     return false// temp
    //     if (!user || restricted) return true
    //     switch(user.username) {
    //         case 'Customer':
    //         case 'Driver':
    //         case 'Vendor':
    //             return true
    //         default:
    //             return false
    //     }
    // }

    const uploadImage = () => {
        if (isDev) alert(`can't upload in dev mode`)
        else setModal('IMAGE')
    }
    
    return (
        <View style={{ marginVertical: 20  }}>

            <ImageList
                images={images}
                loading={uploading}
                restricted={isDev}
                upload={uploadImage}
            />

        </View>
    )
}