import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

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

    const getLocation = async () => {
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

            {
                location && location.lat && location.lng
                ? null
                : <ThemedText>No location data available.</ThemedText>
            }

            {error && <ThemedText>Error: {error}</ThemedText>}

            {location && (
                <View>
                    <LoadScript
                        googleMapsApiKey='AIzaSyDHdT4IZ747lyHYGT53SHsoq31rRkdco6I'
                    >
                        <GoogleMap
                            mapContainerStyle={{
                                marginTop: 5,
                                height: '100vh',
                                width: '100%',
                            }}
                            center={location}
                            zoom={defaultProps.zoom}
                        >
                            <Marker
                                position={location}
                                // style={{
                                //     backgroundColor: 'yellow',
                                //     height: 6,
                                //     width: 6,
                                //     borderRadius: 3,
                                // }}
                            />
                        </GoogleMap>
                    </LoadScript>
                </View>
            )}
        </View>
    )
}