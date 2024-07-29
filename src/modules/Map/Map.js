import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { setUserLocation } from '@utils/map'
import { useApp } from '@app'
import { useContacts } from '@contacts'
import { getAddress } from '@utils/map'
import { GOOGLE_MAPS_API_KEY } from '../../../config'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { InfoMarker } from './components'

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
    const [address, setAddress] = useState(null)
    const [contactLocations, setContactLocations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLocation()
        getLocationsFromContacts()
    }, [])

    // useEffect(() => {
    //     if (location) addressDescriptorReverseGeocoding(location)
    //     else setAddress(null)
    // }, [location])

    // const addressDescriptorReverseGeocoding = coords => {
    //     const string = `${coords.lat},${coords.lng}`
    //     var latlng = new google.maps.LatLng(coords.lat, coords.lng)
    //     geocoder
    //         .geocode({
    //             location: latlng,
    //             extraComputations: ['ADDRESS_DESCRIPTORS']
    //         })
    //         .then(response => {
    //             console.log(response.address_descriptor)
    //             setAddress(response.address_descriptor)
    //         })
    //         .catch(error => {
    //             window.alert(`Error: ${error}`)
    //         })
    //   }
    

    // const getAddressFromCoords = async coords => {
    //     const response = await getAddress(coords)
    //     setAddress(response)
    // }

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
                <InfoMarker
                    key={`contact-location-${index}`}
                    position={data.location}
                    user={data}
                />
            ))}
        </>
    )

    // const renderGoogleMap = () => (

    //     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>

    //         <GoogleMap
    //             mapContainerStyle={{
    //                 height: '100%',
    //                 width: '100%',
    //             }}
    //             center={location}
    //             zoom={defaultProps.zoom}
    //         >
    //             <Marker position={location} />
    //             {renderContactLocations()}
    //         </GoogleMap>
    //     </LoadScript>
    // )

    const renderMap = () => (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
                mapId={`map-${user._id}`}
                defaultCenter={location}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                style={{width: '100%', height: '100%'}}
            >
                {renderContactLocations()}
                <InfoMarker
                    key={`contact-location-${contactLocations.length}`}
                    position={location}
                    user={user}
                />
            </Map>
        </APIProvider>
    )

    return (
        <View style={{ flex: 1, gap: 5 }}>

            <View style={{ flexGrow: 0 }}>

                <View style={{ gap: 10 }}>
                    {/* <SimpleButton
                        label={loading ? 'Loading...' : `${location ? 'Refresh' : 'Load'} Location`}
                        onPress={getLocation}
                        disabled={loading}
                    /> */}
                    {address && <ThemedText>{address}</ThemedText>}
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