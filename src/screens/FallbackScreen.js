import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Screen } from './'
import { navigate } from '../navigators/RootNavigation'

const FallbackScreen = ({ route, ...props }) => {

    useEffect(() => {
        console.log('FallbackScreen: navigating to CheckIn')
        navigate('CheckIn')
    }, [])

    return (
        <Screen {...props}>
            <View style={styles.container}>
                <Text style={styles.heading}>404 Error: {route && route.path ? route.path : ''}</Text>
                <Text style={styles.body}>Sorry. That page does not exist.</Text>
            </View>
        </Screen>
    )
}

export default FallbackScreen

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // height: '100%',
    },
    heading: {
        fontWeight: '700',
        fontSize: 18,
    },
    body: {
        fontSize: 16,
    },
    border: {
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
})