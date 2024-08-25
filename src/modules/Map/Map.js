import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    AddressView,
    InfoMarker,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { Map } from '@vis.gl/react-google-maps'
import { getAddress } from '@utils/map'

export default ({ coords, nomap = false }) => {

    const { user } = useApp()

    const [address, setAddress] = useState(null)
    const [addressLoading, setAddressLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (coords) {
                setAddressLoading(true)
                const currentAddress = await getAddress({
                    lat: coords.latitude,
                    lng: coords.longitude,
                })
                setAddressLoading(false)
                setAddress(currentAddress)
            }
        })()
    }, [coords])

    const getAddressFromCoords = async () => {
        console.log('COORDS', location)
        setAddressLoading(true)
        const results = await getAddress(location)
        console.log('RESULTS', results)
        setAddressLoading(false)
        return results
    }

    const renderMap = () => location ? (
        // <View
        //     style={{ height: 200 }}
        // >
            <Map
                mapId={`map-${Date.now()}`}
                defaultCenter={new google.maps.LatLng(
                    parseFloat(location.lat),
                    parseFloat(location.lng),
                )}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <InfoMarker
                    key={`contact-location`}
                    position={coords}
                    user={user}
                />
            </Map>
        // </View>
    ) : null

    const renderAddress = data => {
        console.log('address data', data)
        const { streetNumber, streetName, cityName } = data
        return (
            <View style={{ flex: 1 }}>
                <ThemedText>{`${streetNumber} ${streetName}, ${cityName}`}</ThemedText>
            </View>
        )
    }

    return (
        <View
            style={{
                flexGrow: 1,
                gap: 5,
                // borderWidth: 1,
                // borderColor: 'yellow',
            }}
        >
            <AddressView address={address} loading={addressLoading} />
            {!nomap && <MapView location={coords} />}
        </View>
    )
}

const MapView = ({ location }) => {
    console.log('location MapView', location)
    return (
        <Map
            mapId={`map-${Date.now()}`}
            defaultCenter={new google.maps.LatLng(
                parseFloat(location.lat),
                parseFloat(location.lng),
            )}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <InfoMarker
                key={`contact-location`}
                position={{ latitude: location.lat, longitude: location.lng }}
                // user={user}
            />
        </Map>
    )
}