import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        if (navigator.geolocation) {
            setLoading(true)
            navigator.geolocation.getCurrentPosition(position => {
                
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })

                setError(null)
                setLoading(false)
            },
            err => setError(err.message))
        } else {
            setError('Geolocation is not supported by this browser.')
        }
    }

    return (
        <View style={{ flex: 1, gap: 5 }}>

            <View style={{ flexBasis: 30, flexGrow: 0 }}>

                {loading
                    ? <ThemedText>Loading...</ThemedText>
                    : (
                        <View style={{ gap: 10 }}>
                            <SimpleButton
                                label={`${location ? 'Refresh' : 'Load'} Location`}
                                onPress={getLocation}
                            />
                            
                            {!location && <ThemedText>Location not available.</ThemedText>
                            }
            
                            {error && <ThemedText color='red'>Error: {error}</ThemedText>}
                        </View>
                    )
                }
                
            </View>

            {location && (
                <View style={{ flexGrow: 1 }}>
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