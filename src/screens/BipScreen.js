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
import { Map } from '@modules'
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
    const [ bipLoading, setBipLoading ] = useState(false)
    const [ images, setImages ] = useState(null)
    const [ loadingAddress, setLoadingAddress ] = useState(false)
    const [ loadingImages, setLoadingImages ] = useState(false)

    useEffect(() => {
        if (bip) {
            fetchBipImages(bip._id)
            // if (!address) {
                // if (bip.location) {
                    // console.log('bip', bip)
                //     const { latitude, longitude } = bip.location
                //     // fetchAddress(bip.location)
                // }
            // }
        }
    }, [bip])
    
    const fetchAddress = async location => {
        const { latitude, longitude } = location
        setLoadingAddress(true)
        const results = await getAddress({ lat: latitude, lng: longitude })
        setLoadingAddress(false)
        if (results) {
            setAddress(results)
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
        setBipLoading(true)
        const data = await loadBip(bipId)
        setBipLoading(false)
        setBip(data)
    }

    const navigateBack = () => {
        props.navigation.navigate('Bips', { screen: 'BipList' })
    }

    // const renderMap = coords => {
    //     const { latitude, longitude } = coords
    //     const latlng = { lat: latitude, lng: longitude }
    //     return <Map coords={latlng} nomap />
    // }

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View
                style={{
                    flexGrow: 1,
                    // borderWidth: 1,
                    // borderColor: 'red'
                }}
            >

                {bipLoading
                    ? <ThemedText>Loading bip...</ThemedText>
                    : bip
                        ? (
                            <View
                                style={{
                                    flexGrow: 1,
                                    gap: 5,
                                    // borderWidth: 1,
                                    // borderColor: 'blue',
                                }}
                            >

                                <Heading
                                    title={bip.user.username}
                                    onBack={navigateBack}
                                />
                                
                                {bip.location && <Map coords={bip.location} nomap />}
                                
                                <View
                                    style={{
                                        flexGrow: 0,
                                        // borderWidth: 1,
                                        // borderColor: 'orange',
                                    }}
                                >
                                    <Time time={bip.createdAt} />
                                </View>

                                <View
                                    style={{
                                        flexGrow: 1,
                                        overflow: 'hidden',
                                        // borderWidth: 1,
                                        // borderColor: 'green',
                                    }}
                                >
                                
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
                                                                // height={image.height}
                                                                // width={image.width}
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