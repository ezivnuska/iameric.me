import React, { useContext } from 'react'
import {
    Text,
} from 'react-native'
import {
    ImageModule,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

export default ({ navigation }) => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen navigation={navigation}>
            
            <Text style={classes.pageTitle}>
                Images
            </Text>
            
            {user
                ? <ImageModule user={user} />
                : <Text>No user</Text>
            }
        </Screen>
    )
}