import React, { useContext } from 'react'
import {
    ImageModule,
    CenteredView,
    LocationModule,
    SecureScreen,
    SignoutModule,
} from '@components'
import { AppContext } from '../AppContext'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return user ? (
        <SecureScreen>

            <>
                
                {
                    user && user.role !== 'driver' &&
                    <LocationModule userId={user._id} />
                }

                <ImageModule />

                <SignoutModule />

            </>

        </SecureScreen>
    ) : null
}