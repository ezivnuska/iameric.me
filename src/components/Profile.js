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

    const restrictedUsernames = ['Customer', 'Driver', 'Vendor']
    const restrictedRoles = ['admin']

    const isRestricted = () => {
        const { role, username } = profile
        let restricted = false
        if (
            (username && restrictedUsernames.indexOf(username) > -1)
            ||
            (role && restrictedRoles.indexOf(role) > -1)
        ) restricted = true

        return restricted
    }
    
    // useEffect(() => {
    //     const init = async () => {
    //         if (!profile && userId) {
    //             setUserLoading(true)
    //             const data = await loadUser(userId)
    //             setUserLoading(false)
    //             if (data) setUser(data)
    //         }
    //     }
    //     init()
    // }, [])
    
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
                isRestricted()
                    ? null
                    : <DeleteAccountButton />
            }

        </View>
    ) : <LoadingView loading='No profile.' />
}