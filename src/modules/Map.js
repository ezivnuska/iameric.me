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

    const renderGoogleMap = () => (

        <LoadScript googleMapsApiKey='AIzaSyDHdT4IZ747lyHYGT53SHsoq31rRkdco6I'>

            <GoogleMap
                mapContainerStyle={{
                    height: '100vh',
                    width: '100%',
                }}
                center={location}
                zoom={defaultProps.zoom}
            >
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    )

    return (
        <View style={{ flex: 1, gap: 5 }}>

            <View style={{ flexBasis: 30, flexGrow: 0 }}>

                <View style={{ gap: 10 }}>
                    <SimpleButton
                        label={loading ? 'Loading...' : `${location ? 'Refresh' : 'Load'} Location`}
                        onPress={getLocation}
                        disabled={loading}
                    />
                    
                    {!loading && !location && <ThemedText>Location not available.</ThemedText>}
    
                    {error && <ThemedText color='red'>Error: {error}</ThemedText>}
                </View>
                
            </View>

            {location && (
                <View style={{ flexGrow: 1, marginTop: 5 }}>
                    {renderGoogleMap()}
                </View>
            )}
        </View>
    )
}