import React, { useState } from 'react'
import { View } from 'react-native'
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'
import { ThemedText } from '@components'

export default ({ position, user, ...props }) => {

    const [ infowindowOpen, setInfowindowOpen ] = useState(true)
    const [ markerRef, marker ] = useAdvancedMarkerRef()

    return (
        <View key={props.key}>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={position}
                title={user.username}
            />

            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}
                >
                    <ThemedText>{user.username}</ThemedText>
                </InfoWindow>
            )}
        </View>
    )
}