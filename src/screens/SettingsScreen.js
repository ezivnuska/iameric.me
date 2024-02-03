import React, { useContext } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    DeleteAccountButton,
    LocationModule,
    Screen,
    UserDetails,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ navigation }) => {

    const theme = useTheme()

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen navigation={navigation}>
            
            <Text
                style={[
                    classes.pageTitle,
                    { color: theme?.colors.textDefault },
                ]}
            >
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

        </Screen>
    )
}