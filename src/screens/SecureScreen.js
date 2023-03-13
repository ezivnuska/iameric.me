import React, { useEffect, useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from './'
import {
    AvatarModule,
    // ImageHandler,
    UserDisplay,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const SecureScreen = props => {

    const { route } = props
    
    const {
        state,
    } = useContext(AppContext)
    
    const { user } = state

    useEffect(() => {
        if (!user && route.name !== 'CheckIn')
            navigate('CheckIn')
    }, [user])

    return (
        <Screen { ...props }>
            <View style={styles.container}>
                <AvatarModule />
                <UserDisplay />
            </View>
        </Screen>
    )
}

export default SecureScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
})