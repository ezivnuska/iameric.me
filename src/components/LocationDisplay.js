import React, { useContext, useEffect, useState } from 'react'
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    LocationForm,
    LocationDetails,
    ModalContainer,
    ButtonPrimary,
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
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    // useEffect(() => {
    //     console.log('location changed', location)
    // }, [location])

    const getLocation = () => {
        axios
            .get(`/api/user/location/${user._id}`)
            .then(({ data }) => {
                setLocation(data.location || initialState)
            })
            .catch(err => console.log('Error getting location:', err))
    }

    const onSubmitAddress = async newLocation => {
        setModalVisible(false)
        const address = await axios
            .post('/api/location', newLocation)
            .then(({ data }) => data.location)
            .catch(err => {
                console.log('Error saving location', err)
                return null
            })
        
        if (address) setLocation(address)
    }

    return location ? (
        <View style={styles.container}>
            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <LocationForm
                    location={location}
                    onSubmit={onSubmitAddress}
                />
            </ModalContainer>
            <LocationDetails
                location={location}
            />
            <ButtonPrimary
                label={!location ? 'Add Location' : 'Edit Location'}
                onPress={() => setModalVisible(true)}
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