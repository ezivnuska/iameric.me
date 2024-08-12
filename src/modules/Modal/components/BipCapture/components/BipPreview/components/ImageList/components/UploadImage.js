import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ActivityIndicator } from '@components'
import {
    resolveUpload,
    useBips,
} from '@bips'
import {
    uploadBipImage,
    uploadImage,
} from '@utils/images'

export default ({ imageData, bipId = null, size = 100, ...props }) => {

    const { addBipImage } = useBips()

    const [ loading, setLoading ] = useState(false)
    const [ loadedImage, setLoadedImage ] = useState(null)

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            let uploadedImage = null
            
            if (bipId) {
                console.log('imageData', imageData)
                uploadedImage = await uploadBipImage(bipId, imageData)
                if (uploadedImage) {
                    console.log('uploadedImage>>', uploadedImage)
                    resolveUpload({ bipId, filename: uploadedImage.filename })
                    addBipImage({
                        bipId,
                        image: uploadedImage,
                    })
                }
            }
            else uploadedImage = await uploadImage(imageData)
            
            if (uploadedImage) setLoadedImage(uploadedImage)
            
            
            setLoading(false)
        }
        init()
    }, [])

    return (
        <View
            {...props}
            style={{
                borderWidth: 1,
                height: size,
                width: size,
            }}
        >
            {loading && <ActivityIndicator />}
            {loadedImage && (
                <Image
                    src={{ uri: `/assets/${loadedImage.path}/${loadedImage.filename}`}}
                    height={size}
                    width={size}
                />
            )}
        </View>
    )
}