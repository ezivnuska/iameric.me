import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    Heading,
    ThemedText,
    Time,
} from '@components'
import { useBips } from '@bips'
import { loadBip } from '@utils/bips'
import { getBipImages } from '@utils/images'
import { getAddress } from '@utils/map'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { id } = props.route.params

    const { getBip } = useBips()
    
    const [ address, setAddress ] = useState(null)
    const [ bip, setBip ] = useState(null)
    const [ images, setImages ] = useState(null)
    const [ loadingAddress, setLoadingAddress ] = useState(false)
    const [ loadingImages, setLoadingImages ] = useState(false)

    useEffect(() => {
        if (bip) {
            fetchBipImages(bip._id)
            if (!address) {
                if (bip.location) fetchAddress(bip.location)
            }
        }
    }, [bip])
    
    const fetchAddress = async location => {
        const { latitude, longitude } = location
        setLoadingAddress(true)
        const { results } = await getAddress({ lat: latitude, lng: longitude })
        setLoadingAddress(false)
        if (results) {
            const currentAddress = results[0]
            setAddress(currentAddress.formatted_address)
        }
    }

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
        const data = await loadBip(bipId)
        setBip(data)
    }

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
                        
                        {address
                            ? <ThemedText>{address}</ThemedText>
                            : loadingAddress
                                ? <ThemedText>Loading location...</ThemedText>
                                : <ThemedText>Location not available</ThemedText>
                        }
                        
                        <Time time={bip.createdAt} />
                        
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