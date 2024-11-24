import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { Screen } from './components'
import { ThemedText, Time } from '@components'
import { Map } from '@modules'
import { useBips } from '@modules/Bipster'
import { loadBip } from '@utils/bips'
import { getBipImages } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { id } = props.route.params

    const { getBip } = useBips()
    
    const [ bip, setBip ] = useState(null)
    const [ bipLoading, setBipLoading ] = useState(false)
    const [ images, setImages ] = useState(null)
    const [ loadingImages, setLoadingImages ] = useState(false)

    useEffect(() => {
        if (bip) fetchBipImages(bip._id)
    }, [bip])

    const fetchBipImages = async bipId => {
        setLoadingImages(true)
        const data = await getBipImages(bipId)
        setLoadingImages(false)
        setImages(data)
    }

    useEffect(() => {
        if (id) {
            if (!bip || bip._id !== id) {
                const result = getBip(id)
                if (result) setBip(result)
                else fetchBip(id)
            }
        }
    }, [id])

    const fetchBip = async bipId => {
        setBipLoading(true)
        const data = await loadBip(bipId)
        setBipLoading(false)
        setBip(data)
    }

    return (
        <Screen
            {...props}
            secure
            key={`bip-screen-${new Date()}`}
        >
    
            <View style={{ flexGrow: 1 }}>

                {bipLoading
                    ? <ThemedText>Loading bip...</ThemedText>
                    : bip
                        ? (
                            <View style={{ flexGrow: 1, gap: 5 }}>
                                
                                {bip.location && <Map coords={bip.location} nomap />}
                                
                                <View style={{ flexGrow: 0 }}>
                                    <Time time={bip.createdAt} />
                                </View>

                                <View style={{ flexGrow: 1, overflow: 'hidden' }}>
                                
                                    {loadingImages
                                        ? <ThemedText>Loading Images...</ThemedText>
                                        : (
                                            <View style={{ gap: 10 }}>
                                                {(images && images.length > 0) && images.map((image, index) => {
                                                    return (
                                                        <View
                                                            key={`bip-image-${index}`}
                                                            style={{
                                                                height: image.height,
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <Image
                                                                source={{
                                                                    uri: `${IMAGE_PATH}/${image.path}/${image.filename}`
                                                                }}
                                                                resizeMethod='scale'
                                                                resizeMode='cover'
                                                                style={{
                                                                    height: image.height,
                                                                    width: image.width,
                                                                }}
                                                            />
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        )
                        : <ThemedText>No bip.</ThemedText>
                }
    
            </View>
    
        </Screen>
    )
}