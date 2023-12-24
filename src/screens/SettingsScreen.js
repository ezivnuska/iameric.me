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

export default () => {

    const {
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('user on load', user)
    // }, [])

    // useEffect(() => {
    //     console.log('user changed', user)
    // }, [user])

    return (
        <SecureScreen>

            {user && <View
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
                <DeleteAccountButton id={user._id} />

            </View>}

        </SecureScreen>
    )
}