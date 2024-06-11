import React, { useEffect, useMemo } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LoadingView,
} from '@components'
import {
    LocationDetails,
} from './components'
import {
    useForm,
    useModal,
    useApp,
} from '@context'
import { getUserLocation } from '@utils/location'

export default () => {

    const { userLoading, profile, setUserLoading, updateUser } = useApp()
    const { formLoading } = useForm()
    const { setModal } = useModal()

    useEffect(() => {
        const init = async () => {
            if (profile && profile.location && typeof profile.location === 'string') {
                setUserLoading(true)
                const details = await getUserLocation(profile.location)
                setUserLoading(false)
                if (!details) console.log('could not load user location')
                else updateUser({ location: details })
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
                iconName={profile.location ? 'create-outline' : 'add-outline'}
                label='Location'
                disabled={formLoading}
                onPress={() => setModal('LOCATION', profile.location)}
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
            
            {profile.location
                ? <LocationDetails location={profile.location} />
                : (
                    <Pressable
                        onPress={() => setModal('LOCATION')}
                    >
                        <ThemedText>Add your location.</ThemedText>
                    </Pressable>
                )}
            
        </View>
    )
}