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

            const { width, height } = getMaxImageDims(image.width, image.height, { width: maxDims.width * 0.9, height: maxDims.height * 0.9 })
            setImageDims({ width, height })

        }

    }, [maxDims])

    return imageDims && (
        <Pressable
            onPress={() => addModal('SHOWCASE', image)}
            disabled={image.uri}
            style={{
                width: maxDims.width,
                height: maxDims.height,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Image
                source={image?.uri ? { uri: image.uri } : `${Paths.ASSETS}/${user.username}/${image.filename}`}
                resizeMode='contain'
                style={[{
                    width: imageDims.width,
                    height: imageDims.height,
                    opacity: image?.uri ? 0.7 : 1.0,
                    marginHorizontal: 'auto',
                }, shadow]}
            />
        </Pressable>
    )
}

export default ImageLoader