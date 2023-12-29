import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    DeleteAccountButton,
    ImageModule,
    LocationModule,
    SecureScreen,
    SignoutModule,
    UserDetails,
} from '@components'
import { AppContext } from '../AppContext'

export default ({ navigation }) => {

    const {
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('user on load', user)
    // }, [])

    // useEffect(() => {
    //     console.log('user changed', user)
    //     if (!user) navigation.navigate('Start')
    // }, [user])

    return (
        <SecureScreen navigation={navigation}>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                
                {user && (
                    <View>
                        <UserDetails user={user} />

                        {user.role !== 'driver' && <LocationModule userId={user._id} />} 
                        
                        <SignoutModule />
                        
                        {user.username !== 'Customer' &&
                        user.username !== 'Driver' && 
                        user.username !== 'Vendor' &&
                        <DeleteAccountButton id={user._id} />}
                        
                    </View>
                )}

            </View>

        </SecureScreen>
    )
}