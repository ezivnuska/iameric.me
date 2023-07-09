import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    LocationForm,
    LocationDetails,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

const LocationDisplay = props => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const [location, setLocation] = useState(null)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        axios
            .get(`/api/user/location/${user._id}`)
            .then(({ data }) => {
                setLocation(data.location || initialState)
            })
            .catch(err => console.log('Error getting location:', err))
    }

    const onSubmitAddress = newLocation => {
        
        axios
            .post('/api/location', newLocation)
            .then(({ data }) => setLocation(data))
            .catch(err => console.log('Error saving location', err))
    }

    return location ? (
        <View style={styles.container}>
            <LocationForm
                location={location}
                onSubmit={onSubmitAddress}
            />
            <LocationDetails
                location={location}
            />
        </View>
    ) : null
}

export default LocationDisplay

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 550,
        minWidth: '70%',
        maxWidth: 900,
    },
})