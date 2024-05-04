import React from 'react'
import { Screen } from '.'
import {
    DeleteAccountButton,
    LoadingView,
    LocationModule,
    ScreenContent,
    TitleBar,
    UserDetails,
} from '@components'
import {
    useUser,
} from '@context'

export default props => {

    const { profile, userLoading } = useUser()

    const restrictedUsernames = ['Customer', 'Driver', 'Vendor']
    const restrictedRoles = ['admin']

    const isRestricted = () => {
        const { role, username } = profile
        return (
            (username && restrictedUsernames.indexOf(username) > -1)
            || (role && restrictedRoles.indexOf(role) > -1)
        )
    }
    
    if (userLoading) return <LoadingView loading='Loading profile.' />

    return (
        <Screen {...props}>
            {profile ? (
                <>
                    <TitleBar title={profile.username} />
                    <ScreenContent>
                        <UserDetails userId={profile._id} />
                        <LocationModule userId={profile._id} />
                        {!isRestricted() && <DeleteAccountButton />}
                    </ScreenContent>
                </>
            ) : <LoadingView loading='Loading profile...' />}
        </Screen>
    )
}