import React from 'react'
import {
    View,
} from 'react-native'
import {
    DeleteAccountButton,
    LocationModule,
    UserDetails,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { useUser } from '@context'

export default () => {

    const { profile } = useUser()

    return (
        <Screen
            titleComponent={<ScreenTitle title='Settings' />}
        >
            
            <View
                style={{
                    paddingHorizontal: 10,
                }}
            >
                <UserDetails userId={profile._id} />

                {profile.role !== 'driver' && <LocationModule userId={profile._id} />}
                
                {
                    profile.username !== 'Customer' &&
                    profile.username !== 'Driver' && 
                    profile.username !== 'Vendor' &&
                    <DeleteAccountButton />
                }
                
            </View>

        </Screen>
    )
}