import React, { useContext } from 'react'
import {
    EntryModule,
    ImageModule,
    CenteredContent,
    LocationModule,
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
                
                {(user && user.role !== 'driver') &&
                    <LocationModule userId={user._id} />}

                <ImageModule />

                <EntryModule />

                <SignoutModule />

            </CenteredContent>

        </Screen>
    )
}