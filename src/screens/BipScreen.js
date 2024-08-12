import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    Heading,
    ThemedText,
} from '@components'
import { useBips } from '@bips'
import { getBipImages } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { id } = props.route.params

    const { getBip } = useBips()

    const [ bip, setBip ] = useState(null)
    const [ images, setImages ] = useState(null)
    const [ loadingImages, setLoadingImages ] = useState(false)

    const fetchBip = async () => {
        const data = await getBip(id)
        setBip(data)
    }

    const fetchBipImages = async () => {
        setLoadingImages(true)
        const data = await getBipImages(id)
        setLoadingImages(false)
        setImages(data)
    }

    useEffect(() => {
        if (id) {
            if (!bip || bip._id !== id) {
                fetchBip()
                fetchBipImages()
            }
        }
    }, [id])

    const navigateBack = () => {
        props.navigation.navigate('Bips', { screen: 'BipList' })
    }

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>

                {bip ? (
                    <View style={{ flex: 1 }}>

                        <Heading
                            title={`Bip-${bip._id}`}
                            onBack={navigateBack}
                        />
                        {loadingImages ? (
                            <ThemedText>Loading Images...</ThemedText>
                        ) : (
                            <View style={{ gap: 10 }}>
                                {(images && images.length > 0) && images.map((image, index) => {
                                    return (
                                        <Image
                                            key={`bip-image-${index}`}
                                            source={{
                                                uri: `${IMAGE_PATH}/${image.path}/${image.filename}`
                                            }}
                                            height={image.height}
                                            width={image.width}
                                            style={{
                                                height: image.height,
                                                width: image.width,
                                            }}
                                        />
                                    )
                                })}
                            </View>
                        )}
                    </View>
                ) : <ThemedText>No bip.</ThemedText>}
    
            </View>
    
        </Screen>
    )
}