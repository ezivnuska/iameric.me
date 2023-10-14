import React, { useContext } from 'react'
import {
    AvatarDisplay,
    CenteredContent,
    LocationDisplay,
    Screen,
    SignoutModule,
} from '../components'
import { AppContext } from '../AppContext'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen>

            <CenteredContent>
                
                {(user.role !== 'driver') && <LocationDisplay details={user.location} />}

                <AvatarDisplay />

                <SignoutModule />

            </CenteredContent>

        </Screen>
    )
}