import React, { useEffect, useMemo } from 'react'
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
    useForm,
    useModal,
    useUser,
} from '@context'
import { getLocationByUserId, getUserLocationById } from '@utils/data'

export default ({ userId }) => {
    const { profile } = useUser()
    const { setModal } = useModal()
    const { formLoading } = useForm()
    const { location } = useMemo(() => profile, [profile])

    useEffect(() => {
        let userLocation = null
        if (location && typeof location === 'string') {
             userLocation = getUserLocationById(location)
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
                iconName={location ? 'create-outline' : 'add-outline'}
                label='Address'
                disabled={formLoading}
                onPress={() => setModal('LOCATION', location)}
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
            
            {location && typeof location !== 'string'
                ? <LocationDetails location={location} />
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