import React, { useContext } from 'react'
import {
    ImageModule,
    Screen,
    ScreenTitle,
    ThemedText,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

export default ({ navigation }) => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen navigation={navigation}>
            
            <ScreenTitle title='Images' />
            
            {user
                ? <ImageModule user={user} />
                : <ThemedText>No user</ThemedText>
            }
        </Screen>
    )
}