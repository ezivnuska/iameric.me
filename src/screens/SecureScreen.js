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
        if (!user && route.name !== 'CheckIn') navigate('CheckIn')
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