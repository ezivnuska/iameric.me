import React, { useEffect, useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from './'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const SecureScreen = ({ children, ...props }) => {

    const { route } = props
    
    const {
        state,
    } = useContext(AppContext)
    
    const { user } = state

    useEffect(() => {
        // console.log('Secure Screen user changed', user)
        if (!user) {
            // console.log('no user....')
            if (!route) {
                // console.log('route name not auth. navigating to auth')
                navigate('auth')
            }
        }
    }, [user])

    return (
        <Screen { ...props }>
            {user ? (
                <View style={styles.container}>
                    {children}
                </View>
            ) : null}
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