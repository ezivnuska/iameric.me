import React, { useContext, useEffect, useState } from 'react'
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    // Disconnect,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

// const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const maxHeight = 50
const minHeight = 0
const scrollDistance = maxHeight - minHeight

const Header = ({ animHeaderValue }) => {
    
    const {
        // state,
        user,
    } = useContext(AppContext)
    

    const animatedHeaderHeight =  animHeaderValue.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [maxHeight , minHeight],
        extrapolate: 'clamp'
    })

    const animatedHeaderBackgroundColor = animHeaderValue.interpolate({
        inputRange: [0, maxHeight - minHeight],
        outputRange: ['blue', 'red'],
        extrapolate: 'clamp'
    })
    
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    height: animatedHeaderHeight,
                    // backgroundColor: animatedHeaderBackgroundColor,
                }]}>
            <View style={styles.headerContainer}>
                <Brand onPress={() => navigate(user ? 'home' : 'auth')} />
                {user && <AuthMenu navigate={navigate} user={user} />}
            </View>
        </Animated.View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#369',
        width: '100%',
    },
    headerContainer: {
        flex: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width: '98%',
        minWidth: 300,
        maxWidth: 900,
        marginHorizontal: 'auto',
        // backgroundColor: '#369',
        // borderWidth: 1,
        // borderColor: 'green',
    },
})