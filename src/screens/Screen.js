import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'
// const window = Dimensions.get('window')
const { height } = window

const Screen = ({ children, route }) => {
    // console.log('Screen:route:', route)
    useEffect(() => {
        const saveRoute = async () => {
            const routeName = (route && route.name) ? route.name : 'auth'
            // const { pathname } = window.location
            // console.log('path', pathname)
            // console.log('screen route:', route)
            
            await AsyncStorage
                .setItem('route', routeName)
                .then(() => {
                    // console.log('path updated', route.name)
                })
                .catch(err => alert('could not save path:', err))
        }
        saveRoute()
        
    }, [])
    
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: ,
        // alignContent: 'center',
        height: height - 50,
        // width: '100%',
        // backgroundColor: '#fff',
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'red',
    },
})