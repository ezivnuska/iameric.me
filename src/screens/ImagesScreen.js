import React, { useContext, useEffect } from 'react'
import {
    Text,
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
    // }, [user])

    return (
        <SecureScreen navigation={navigation}>
            {user
                ? <ImageModule user={user} />
                : <Text>No user</Text>
            }
        </SecureScreen>
    )
}