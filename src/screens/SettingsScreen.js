import React, { useContext } from 'react'
import {
    ImageModule,
    CenteredContent,
    LocationModule,
    SecureScreen,
    SignoutModule,
} from '@components'
import { AppContext } from '../AppContext'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <SecureScreen>
            
            {user ? (
                <CenteredContent>
                    
                    {
                        user.role !== 'driver' &&
                        <LocationModule userId={user._id} />
                    }

                    <ImageModule />

                    <SignoutModule />

                </CenteredContent>
            ) : null}

        </SecureScreen>
    )
}