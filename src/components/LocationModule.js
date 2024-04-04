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
import { AppContext } from '@context'
import { getLocationByUserId, getUserLocationById } from '../utils/data'

export default ({ userId }) => {

    const {
        dispatch,
        loading,
        // location,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (user.location && typeof user.location === 'string') {
            getUserLocationById(dispatch, user.location)
        } else {
            getLocationByUserId(dispatch, userId)
        }
    }, [])
    
    if (loading) return <LoadingView />

    return (
        <View
            style={{
                marginVertical: 20,
                outlineColor: 'none',
                outlineStyle: 'none',
            }}
        >
            
            <IconButton
                iconName={user.location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={loading}
                onPress={() => dispatch({
                    type: 'SET_MODAL',
                    payload: {
                        type: 'LOCATION',
                    },
                })}
                alignIcon='right'
                transparent
                justify='flex-start'
                padded={false}
                style={{
                    marginBottom: 5,
                    outlineColor: 'none',
                    outlineStyle: 'none',
                    paddingHorizontal: 0,
                }}
                textStyles={{
                    marginTop: 5,
                    marginLeft: 0,
                }}
            />
            
            {user.location && typeof user.location !== 'string'
                ? <LocationDetails location={user.location} />
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