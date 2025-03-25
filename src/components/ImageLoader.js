import React, { useMemo } from 'react'
import { Image, Pressable, View } from 'react-native'
import { useModal } from '@context'
import { Paths } from '@constants'

const ImageLoader = ({ image, user, maxDims }) => {

    const { addModal } = useModal()

    const source = useMemo(() => image?.uri ? { uri: image.uri } : `${Paths.ASSETS}/${user.username}/${image.filename}`, [image])

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

    return (
        <View style={maxDims}>

            <Pressable
                onPress={() => addModal('SHOWCASE', image)}
                disabled={image.uri}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'stretch',
                }}
            >
            
                <Image
                    source={source}
                    resizeMode='cover'
                    style={[{
                        width: '100%',
                        height: '100%',
                        opacity: image?.uri ? 0.5 : 1.0,
                    }, shadow]}
                />  
                    
            </Pressable>

        </View>
    )
}

export default ImageLoader