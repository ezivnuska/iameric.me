import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
} from '@context'
import { classes } from '@styles'

export default ({ navigation }) => {
    const {
        profile,
        appLoaded,
    } = useApp()

    useEffect(() => {
        console.log('SPLASH')
    }, [])

    useEffect(() => {
        if (appLoaded) {
            navigation.navigate(profile ? 'Main' : 'Start')
        }
    }, [appLoaded])
    
    return (
        <View style={classes.centerV}>
            <ThemedText>iameric</ThemedText>
        </View>
    )
}