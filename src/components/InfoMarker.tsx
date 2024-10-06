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
        getAddressFromCoords({ lat: Number(position.latitude), lng: Number(position.longitude) })
    }, [])

    const getAddressFromCoords = async coords => {
        
        const { results } = await getAddress(coords)
        
        if (results && results.length) {
            const currentAddress = results[0]
            setAddress(currentAddress.formatted_address)
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