import React, { useEffect, useState } from 'react'
import { Image, Pressable } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { useModal } from '@context'
import { Paths } from '@constants'

const ImageLoader = ({ image, user, maxDims }) => {

    const { addModal } = useModal()

    const [imageDims, setImageDims] = useState(null)

    const shadow = {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 1,

        borderWidth: 1,
    }

    useEffect(() => {

        if (maxDims) {

            const { width, height } = getMaxImageDims(image.width, image.height, { width: maxDims.width, height: maxDims.height })
            setImageDims({ width, height })

        }

    }, [maxDims])

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