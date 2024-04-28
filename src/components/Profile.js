import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
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
    const { profile, userLoading } = useUser()

    const restricted = ['Customer', 'Driver', 'Vendor']
    
    useEffect(() => {
        if (!profile && userId) {
            loadUser(userId)
        }
    }, [])
    
    if (userLoading) return <LoadingView loading='Loading profile.' />

    return profile ? (
        <View
            style={{
                paddingHorizontal: 10,
            }}
        >
            <UserDetails userId={profile._id} />

            <LocationModule userId={profile._id} />

            {restricted.indexOf(profile.username) > -1 && <DeleteAccountButton />}
        </View>
    ) : <LoadingView loading='No profile.' />
}