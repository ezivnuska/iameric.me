import React, { useContext, useEffect } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LocationDetails,
} from '.'
import {
    AppContext,
    useModal,
    useUser,
} from '@context'
import { getLocationByUserId, getUserLocationById } from '../utils/data'

export default ({ userId }) => {
    const { profile } = useUser()
    const { setModal } = useModal()
    const {
        loading,
    } = useContext(AppContext)

    useEffect(() => {
        let userLocation = null
        if (profile.location && typeof profile.location === 'string') {
             userLocation = getUserLocationById(profile.location)
        } else {
            userLocation = getLocationByUserId(userId)
        }
    }, [])

    return (
        <View
            style={{
                marginVertical: 20,
                outlineColor: 'none',
                outlineStyle: 'none',
            }}
        >
            
            <IconButton
                iconName={profile.location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={loading}
                onPress={() => setModal('LOCATION')}
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
            
            {profile.location && typeof profile.location !== 'string'
                ? <LocationDetails location={profile.location} />
                : (
                    <Pressable
                        onPress={() => setModal('LOCATION')}
                    >
                        <ThemedText>Add your location.</ThemedText>
                    </Pressable>
                )
            }
            
        </View>
    )
}