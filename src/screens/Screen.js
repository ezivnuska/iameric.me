import React, { useContext, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'
import { Container, StatusDisplay } from '../components'
import { AppContext } from '../AppContext'
const window = Dimensions.get('window')
const { height } = window

const Screen = ({ children, route }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { status } = state
    
    const saveRoute = () => {
        AsyncStorage
            .setItem('route', route.name)
            .then(() => {
                // console.log('path saved in local storage:', route.name)
            })
            .catch(err => console.log('could not save path:', err))
    }

    useEffect(() => {
        if (route && route.name !== 'auth') {
            saveRoute()
        }
    }, [route])

    const hideStatus = () => dispatch({ type: 'SET_STATUS', status: null })
    
    return (
        <View style={styles.container}>
            <StatusDisplay status={status} close={hideStatus} />
            <Container>
                {children}
            </Container>
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        height: height - 50,
        borderWidth: 4,
        borderStyle: 'dashed',
        borderColor: 'purple',
    },
})