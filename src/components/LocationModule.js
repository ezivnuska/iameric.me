import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    HeaderIconButton,
    LoadingView,
    LocationDetails,
} from '.'
import { AppContext } from '../AppContext'
import { getLocationWithUserId } from '../utils/data'

export default ({ userId }) => {

    const {
        dispatch,
        loading,
        location,
    } = useContext(AppContext)


    useEffect(() => {
        getLocationData(userId)
    }, [])

    const getLocationData = async userId => {

        dispatch({ type: 'SET_LOADING', loading: 'Fetching location...' })

        const locationData = await getLocationWithUserId(userId)
        
        dispatch({ type: 'SET_LOADING', loading: null })

        if (!locationData) {
            console.log('could not get location data.')
            return
        }

        dispatch({ type: 'SET_LOCATION', location: locationData })
    }

    return (
        <View>
            
            <HeaderIconButton
                iconName={location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={loading}
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'LOCATION' })}
            />
            
            {loading
                ? <LoadingView label='Loading location...' />
                : location
                    ? <LocationDetails location={location} />
                    : (
                        <Pressable
                            onPress={() => setModalVisible(true)}
                        >
                            <ThemedText>Add your location.</ThemedText>
                        </Pressable>
                    )
            }
            
        </View>
    )
}