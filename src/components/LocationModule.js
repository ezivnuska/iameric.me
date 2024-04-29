import React, { useEffect, useMemo } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LocationDetails,
    LoadingView,
} from '.'
import {
    useForm,
    useUser,
} from '@context'
import {
    getUserLocation,
} from '@utils/location'

export default () => {
    const { profile, setUserLoading, setUserLocation, setUserModal, userLoading } = useUser()
    const { formLoading } = useForm()
    const { location } = useMemo(() => profile, [profile])

    useEffect(() => {
        const init = async () => {
            if (!location) {
                setUserLoading(true)
                const data = await getUserLocation(profile._id)
                console.log('user location', data)
                setUserLoading(false)
                
                if (data) setUserLocation(data.location)
            }
        }
        init()
    }, [])
    
    if (userLoading) return <LoadingView loading='Loading user location' />
    
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
                onPress={() => setUserModal('LOCATION', location || null)}
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
            
            {location
                ? <LocationDetails location={location} />
                : (
                    <Pressable
                        onPress={() => setUserModal('LOCATION')}
                    >
                        <ThemedText>Add your location.</ThemedText>
                    </Pressable>
                )}
            
        </View>
    )
}