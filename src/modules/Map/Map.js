import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { setUserLocation } from '@utils/map'
import { useApp } from '@app'
import { useContacts } from '@contacts'
import { Map } from '@vis.gl/react-google-maps'
import { InfoMarker } from './components'
import { getAddress } from '@utils/map'

export default () => {

    const { updateUser, user } = useApp()
    const { contacts } = useContacts()

    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState(null)
    const [contactLocations, setContactLocations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    let timer

    useEffect(() => {
        // getLocation()
        // getLocationsFromContacts()
        // timer = setInterval(getLocation, 60 * 1000)
    }, [])

    useEffect(() => {
        if (location) getAddressFromCoords(location)
        else setAddress(null)
    }, [location])

    const getAddressFromCoords = async coords => {

        const { results } = await getAddress(coords)
        
        if (results && results.length) {
            const currentAddress = results[0]
            setAddress(currentAddress.formatted_address)
        }
    }

    const getLocationsFromContacts = () => {
        const contactsWithLocations = contacts.filter(contact => {
            return contact.location !== undefined
            // return contact._id !== user._id && contact.location !== undefined
        })
        
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

                if (user) savePosition(position.coords)

                setError(null)
                setLoading(false)
            },
            err => setError(err.message))
        } else {
            setError('Geolocation is not supported by this browser.')
        }
    }

    const renderContactLocations = () => (
        <View>
            {contactLocations.map((data, index) => (
                <InfoMarker
                    key={`contact-location-${index}`}
                    position={data.location}
                    user={data}
                />
            )
            )}
        </View>
    )

    const renderMap = () => (
        <Map
            mapId={`map-${Date.now()}`}
            defaultCenter={location}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            style={{width: '100%', height: '100%'}}
        >
            {contactLocations && renderContactLocations()}
            {/* {user.location && (
                <InfoMarker
                    key={`contact-location-${contactLocations.length || 0}`}
                    position={user.location}
                    user={user}
                />
            )} */}
        </Map>
    )

    return (
        <View style={{ flex: 1, gap: 5 }}>

            <View style={{ flexGrow: 0 }}>

                <View style={{ gap: 10 }}>

                    {address ? <ThemedText>{address}</ThemedText> : null}
                    
                    {!loading && !location && <ThemedText>Location not available.</ThemedText>}
    
                    {error && <ThemedText color='red'>Error: {error}</ThemedText>}
                </View>
                
            </View>

            {location && (
                <View style={{ flexGrow: 1 }}>
                    {renderMap()}
                </View>
            )}
        </View>
    )
}