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
} from '.'
import { AppContext } from '../../AppContext'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen title='Settings'>
            
            {user && (
                <View>
                    <UserDetails user={user} />

                    {user.role !== 'driver' && <LocationModule userId={user._id} />}
                    
                    {
                        user.username !== 'Customer' &&
                        user.username !== 'Driver' && 
                        user.username !== 'Vendor' &&
                        <DeleteAccountButton />
                    }
                    
                </View>
            )}

        </Screen>
    )
}