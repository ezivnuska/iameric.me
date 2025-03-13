import React, { useEffect, useState } from 'react'
import { Image, Pressable } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { useModal } from '@context'
import { Paths } from '@constants'

const ImageLoader = ({ image, user }) => {

    const { addModal } = useModal()

    const [imageDims, setImageDims] = useState(null)

    const maxSize = 200

    const shadow = {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 1,
    }

    useEffect(() => {
        const { width, height } = getMaxImageDims(image.width, image.height, { width: maxSize, height: maxSize })
        setImageDims({ width, height })
    }, [])

    return imageDims && (
        <Pressable
            onPress={() => addModal('SHOWCASE', image)}
            disabled={image.uri}
            style={[{
                width: imageDims.width,
                height: imageDims.height,
            }, shadow]}
        >
            <Image
                source={image?.uri ? { uri: image.uri } : `${Paths.ASSETS}/${user.username}/${image.filename}`}
                resizeMode='contain'
                style={{
                    height: '100%',
                    width: '100%',
                    opacity: image?.uri ? 0.7 : 1.0,
                }}
            />
        </Pressable>
    )
}

export default ImageLoader