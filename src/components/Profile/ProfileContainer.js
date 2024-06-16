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
    useApp,
} from '@context'
import {
    switchAvailability,
} from '@utils/user'

export default () => {

    const {
        profile,
        socket,
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
                _id: profile._id,
                available: user.available,
            })
            socket.emit('status_change', user._id)
        }
    }
    

    return profile ? (
        <>
            <UserDetails profile={profile} toggleStatus={handleStatusChange} />
            <LocationModule userId={profile._id} />
            {!isRestricted() && <DeleteAccountButton />}
        </>
    ) : <LoadingView loading='Loading profile...' />
}