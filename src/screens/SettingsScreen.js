import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ImageModule,
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

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                <View>
                    <UserDetails user={user} />

                    {user.role !== 'driver' && <LocationModule userId={user._id} />}

                    <ImageModule />    
                </View>

                <SignoutModule />

            </View>

        </SecureScreen>
    ) : null
}