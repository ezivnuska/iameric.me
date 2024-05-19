import React from 'react'
import {
    LoadingView,
} from '@components'
import {
    DeleteAccountButton,
    LocationModule,
    UserDetails,
} from './components'
import {
    useUser,
} from '@context'

export default () => {

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

    return profile ? (
        <>
            <UserDetails userId={profile._id} />
            <LocationModule userId={profile._id} />
            {!isRestricted() && <DeleteAccountButton />}
        </>
    ) : <LoadingView loading='Loading profile...' />
}