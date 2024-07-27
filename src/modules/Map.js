import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import GoogleMapReact from 'google-map-react'

const defaultProps = {
    center: {
        latitude: 10.99835602,
        longitude: 77.01502627,
    },
    zoom: 11,
}

export default () => {

    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setError(null)
            },
            err => setError(err.message))
        } else {
            setError('Geolocation is not supported by this browser.')
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {location && location.lat && location.lng ? (
                <ThemedText>
                    Latitude: {location.lat}, Longitude: {location.lng}
                </ThemedText>
            ) : (
                <ThemedText>No location data available.</ThemedText>
            )}

            {error && <ThemedText>Error: {error}</ThemedText>}

            {location && (
                <View
                    style={{
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: '' }}
                        defaultCenter={location}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                    >
                        <View
                            lat={location.lat}
                            lng={location.lng}
                            style={{
                                backgroundColor: 'pink',
                                height: 6,
                                width: 6,
                                borderRadius: 3,
                            }}
                        />
                    </GoogleMapReact>
                </View>
            )}
        </View>
    )
}