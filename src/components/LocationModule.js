import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    DefaultText,
    HeaderIconButton,
    LoadingView,
    LocationForm,
    LocationDetails,
    PopUpModal,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { getLocationWithUserId } from '../utils/data'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

export default ({ userId }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [location, setLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLocationData(userId)
    }, [])

    const getLocationData = async userId => {

        setLoading(true)

        const locationData = await getLocationWithUserId(userId)
        
        setLoading(false)

        if (!locationData) {
            console.log('could not get location data.')
            return
        }

        setLocation(locationData)
    }

    const onSubmitAddress = async newLocation => {
        setLoading(true)

        const { data } = await axios
            .post('/api/location', newLocation)
        
        setLoading(false)
        
        if (!data) {
            console.log('Error saving location', err)
            return
        }

        dispatch({ type: 'UPDATE_LOCATION', location: data.location })
        
        setLocation(data.location)

        setModalVisible(false)
    }

    return (
        <View>
            
            <HeaderIconButton
                iconName={location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={loading}
                onPress={() => setModalVisible(true)}
            />
            
            {loading
                ? <LoadingView label='Loading location...' />
                : location
                    ? <LocationDetails location={location} />
                    : (
                        <Pressable
                            onPress={() => setModalVisible(true)}
                        >
                            <DefaultText>Add your location.</DefaultText>
                        </Pressable>
                    )
            }

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <LocationForm
                    location={location || initialState}
                    onSubmit={onSubmitAddress}
                />
            </PopUpModal>
            
        </View>
    )
}