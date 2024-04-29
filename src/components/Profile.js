import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    DeleteAccountButton,
    LoadingView,
    LocationModule,
    UserDetails,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'
import { loadUser } from '@utils/user'

export default () => {

    const { userId } = useApp()
    const { profile, setUser, userLoading, setUserLoading } = useUser()

    const restricted = ['iameric', 'Customer', 'Driver', 'Vendor']
    
    useEffect(() => {
        const init = async () => {
            if (!profile && userId) {
                setUserLoading(true)
                const data = await loadUser(userId)
                setUserLoading(false)
                console.log('loadedUser....', data)
                if (data) setUser(data)
            }
        }
        init()
    }, [])

    useEffect(() => {
        if (profile) {
            console.log('profile', profile)
            console.log('restricted', restricted.indexOf(profile.username) > -1)
        }
    }, [profile])
    
    if (userLoading) return <LoadingView loading='Loading profile.' />

    return profile ? (
        <View
            style={{
                paddingHorizontal: 10,
            }}
        >
            <UserDetails userId={profile._id} />

            <LocationModule userId={profile._id} />

            {
                restricted.indexOf(profile.username) > -1
                    ? null
                    : <DeleteAccountButton />
            }

        </View>
    ) : <LoadingView loading='No profile.' />
}