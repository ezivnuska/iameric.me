import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { Map } from '@vis.gl/react-google-maps'
import { InfoMarker } from './components'
import { getAddress } from '@utils/map'

export default ({ coords, nomap = false }) => {

    const { user } = useApp()

    const location = useMemo(() => ({
        lat: coords.latitude,
        lng: coords.longitude,
    }), [coords])

    const [address, setAddress] = useState(null)
    const [addressLoading, setAddressLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (location) {
                const currentAddress = await getAddressFromCoords(location)
                setAddress(currentAddress)
            }
        })()
    }, [location])

    const getAddressFromCoords = async () => {
        setAddressLoading(true)
        const { results } = await getAddress(location)
        setAddressLoading(false)
        if (results && results.length) {
            const currentAddress = results[0]
            return currentAddress.formatted_address
        }
        return null
    }

    const renderMap = () => (
        <Map
            mapId={`map-${Date.now()}`}
            defaultCenter={location}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            style={{width: '100%', height: '100%'}}
        >
            <InfoMarker
                key={`contact-location`}
                position={coords}
                user={user}
            />
        </Map>
    )

    return (
        <View style={{ flex: 1, gap: 5 }}>

            {addressLoading
                ? <ThemedText>Determining address...</ThemedText>
                : address
                    ? <ThemedText>{address}</ThemedText>
                    : <ThemedText>Could not find address.</ThemedText>
            }
            {!nomap && (
                <View style={{ flexGrow: 1 }}>
                    {location && renderMap()}
                </View>
            )}
        </View>
    )
}