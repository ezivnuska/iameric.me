import React, { useContext, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'
import { Container } from '../components'
// const window = Dimensions.get('window')
const { height } = window

const Screen = ({ children, route }) => {
    
    const saveRoute = async () => {
        await AsyncStorage
            .setItem('route', route.name)
            .then(() => {
                console.log('path saved in local storage:', route.name)
            })
            .catch(err => alert('could not save path:', err))
    }

    useEffect(() => {
        if (route && route.name && route.name !== 'auth') {
            saveRoute()
        }
    }, [])
    
    return (
        <View style={styles.container}>
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

    },
})