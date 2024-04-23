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

export default props => {

    const { profile } = useUser()

    return profile && (
        <Screen
            {...props}
        >
            
            <View
                style={{
                    paddingHorizontal: 10,
                }}
            >
                <UserDetails userId={profile._id} />

                <LocationModule userId={profile._id} />
                
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