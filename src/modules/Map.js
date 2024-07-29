import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { setUserLocation } from '@utils/map'
import { useApp } from '@app'
import { useContacts } from '@contacts'

const defaultProps = {
    center: {
        latitude: 10.99835602,
        longitude: 77.01502627,
    },
    zoom: 11,
}

export default () => {

    const { updateUser, user } = useApp()
    const { contacts } = useContacts()

    const [location, setLocation] = useState(null)
    const [contactLocations, setContactLocations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLocation()
        getLocationsFromContacts()
    }, [])

    const getLocationsFromContacts = () => {
        const contactsWithLocations = contacts.filter(contact => contact.location !== null)
        const locations = contactsWithLocations.map(contact => {
            const { _id, username, location } = contact
            return { _id, username, location }
        })
        setContactLocations(locations)
    }

    const savePosition = async ({ latitude, longitude }) => {
        const updatedUser = await setUserLocation(latitude, longitude, user._id)
        if (updatedUser) updateUser({ location: { latitude, longitude } })
        else console.log('Error updating user')
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            setLoading(true)
            navigator.geolocation.getCurrentPosition(position => {
                
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })

                savePosition(position.coords)

                setError(null)
                setLoading(false)
            },
            err => setError(err.message))
        } else {
            setError('Geolocation is not supported by this browser.')
        }
    }

    const renderContactLocations = () => (
        <>
            {contactLocations.map((data, index) => (
                <Marker position={location} />
            ))}
        </>
    )

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
                {renderContactLocations()}
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