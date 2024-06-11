import React from 'react'
import {
    LoadingView,
} from '@components'
import {
    DeleteAccountButton,
    DepositForm,
    LocationModule,
    UserDetails,
} from './components'
import {
    useApp,
} from '@context'

export default ({ profile }) => {

    const { appLoading } = useApp()

    const restrictedUsernames = ['Customer', 'Driver', 'Vendor']
    const restrictedRoles = ['admin']

    const isRestricted = () => {
        const { role, username } = profile
        return (
            (username && restrictedUsernames.indexOf(username) > -1)
            || (role && restrictedRoles.indexOf(role) > -1)
        )
    }
    
    if (appLoading) return <LoadingView loading='Loading profile.' />

    return profile ? (
        <>
            <UserDetails userId={profile._id} />
            <LocationModule userId={profile._id} />
            <DepositForm user={profile} />
            {!isRestricted() && <DeleteAccountButton />}
        </>
    ) : <LoadingView loading='Loading profile...' />
}