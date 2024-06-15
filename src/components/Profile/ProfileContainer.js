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
import {
    switchAvailability,
} from '@utils/user'

export default () => {

    const {
        appLoading,
        profile,
        socket,
        toggleStatus,
        updateUser,
    } = useApp()

    const restrictedUsernames = ['Customer', 'Driver', 'Vendor']
    const restrictedRoles = ['admin']

    const isRestricted = () => {
        const { role, username } = profile
        return (
            (username && restrictedUsernames.indexOf(username) > -1)
            || (role && restrictedRoles.indexOf(role) > -1)
        )
    }

    const handleStatusChange = async () => {
        const user = await switchAvailability(profile._id)
        if (user) {
            await updateUser({
                available: user.available,
            })
            socket.emit('status_change', user._id)
        }
        // toggleStatus()
    }
    
    // if (appLoading) return <LoadingView loading='Loading profile.' />

    return profile ? (
        <>
            <UserDetails profile={profile} toggleStatus={handleStatusChange} />
            <LocationModule userId={profile._id} />
            <DepositForm user={profile} />
            {!isRestricted() && <DeleteAccountButton />}
        </>
    ) : <LoadingView loading='Loading profile...' />
}