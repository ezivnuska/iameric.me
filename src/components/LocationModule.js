import React, { useContext, useEffect } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
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
        if (!location) getLocationData(userId)
    }, [])

    const getLocationData = async userId => {

        dispatch({ type: 'SET_LOADING', loading: 'Fetching location...' })

        const data = await getLocationWithUserId(userId)
        
        if (!data) {
            console.log('could not get location data.')
        } else {
            dispatch({ type: 'SET_LOCATION', location: data.location })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <View
            style={{
                marginVertical: 20,
                outlineColor: 'none',
                outlineStyle: 'none',
            }}
        >
            
            <IconButton
                iconName={location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={loading}
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'LOCATION' })}
                alignIcon='right'
                transparent
                align='flex-start'
                padded={false}
                style={{
                    // textAlign: 'left',
                    // borderWidth: 1,
                    // borderColor: 'white',
                    marginBottom: 5,
                    outlineColor: 'none',
                    outlineStyle: 'none',
                }}
                textStyles={{
                    marginTop: 5,
                    marginLeft: 0,
                }}
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