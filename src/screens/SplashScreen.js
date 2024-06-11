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
        // if (userLoaded) navigation.navigate(userId ? 'Main' : 'Start')
        if (appLoaded) {
            if (!profile) navigation.navigate('Start')
            else navigation.navigate('Main')
        }
    }, [appLoaded])
    
    return (
        <View style={classes.centerV}>
            <ThemedText>iameric</ThemedText>
        </View>
    )
}