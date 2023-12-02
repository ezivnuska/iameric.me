import React, { useContext } from 'react'
import {
    ImageModule,
    CenteredView,
    LocationModule,
    SecureScreen,
    SignoutModule,
} from '@components'
import { AppContext } from '../AppContext'
import { UserDetails } from 'src/components'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return user ? (
        <SecureScreen>

            <>
                <UserDetails user={user} />

                {user.role !== 'driver' && <LocationModule userId={user._id} />}

                <ImageModule />

                <SignoutModule />

            </>

        </SecureScreen>
    ) : null
}