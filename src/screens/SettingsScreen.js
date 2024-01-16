import React, { useContext } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    DeleteAccountButton,
    ImageModule,
    LocationModule,
    SecureScreen,
    UserDetails,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

export default ({ navigation }) => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <SecureScreen navigation={navigation}>
            
            <Text style={classes.pageTitle}>
                Settings
            </Text>
            
            {user && (
                <View>
                    <UserDetails user={user} />

                    {user.role !== 'driver' && <LocationModule userId={user._id} />}
                    
                    {
                        user.username !== 'Customer' &&
                        user.username !== 'Driver' && 
                        user.username !== 'Vendor' &&
                        <DeleteAccountButton id={user._id} />
                    }
                    
                </View>
            )}

        </SecureScreen>
    )
}