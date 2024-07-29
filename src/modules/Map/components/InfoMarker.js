import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'
import { ThemedText } from '@components'
import { getAddress } from '@utils/map'

export default ({ position, user, ...props }) => {

    const [ infowindowOpen, setInfowindowOpen ] = useState(false)
    const [ address, setAddress ] = useState(null)

    const [ markerRef, marker ] = useAdvancedMarkerRef()

    useEffect(() => {
        getAddressFromCoords({ lat: position.latitude, lng: position.longitude })
    }, [])

    const getAddressFromCoords = async coords => {
        
        const { results } = await getAddress(coords)
        
        if (results && results.length) {
            console.log('ZACH:')
            console.log('')
            console.log('reverse geolocation returns an array of possible results...', results)
            const currentAddress = results[0]
            console.log('')
            console.log('we pick the first one', currentAddress)
            setAddress(currentAddress.formatted_address)
            console.log('')
            console.log('this is all of the pieces', currentAddress.address_components)
        }
    }
    
    return (
        <View key={props.key}>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{ lat: Number(position.latitude), lng: Number(position.longitude) }}
                title={user.username}
            />

            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ gap: 5 }}>
                            <ThemedText>{user.username}</ThemedText>
                            <ThemedText>{address}</ThemedText>
                        </View>
                    </View>
                </InfoWindow>
            )}
        </View>
    )
}