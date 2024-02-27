import React, { useContext } from 'react'
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
import { AppContext } from '../../AppContext'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen
            titleComponent={<ScreenTitle title='Settings' />}
        >
            
            <View
                style={{
                    paddingHorizontal: 10,
                    maxWidth: 300,
                }}
            >
                <UserDetails userId={user._id} />

                {user.role !== 'driver' && <LocationModule userId={user._id} />}
                
                {
                    user.username !== 'Customer' &&
                    user.username !== 'Driver' && 
                    user.username !== 'Vendor' &&
                    <DeleteAccountButton />
                }
                
            </View>

        </Screen>
    )
}