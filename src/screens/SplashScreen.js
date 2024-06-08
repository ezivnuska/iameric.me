import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
} from '@context'
import { classes } from '@styles'

export default ({ navigation }) => {
    const {
        userId,
        userLoaded,
    } = useApp()

    useEffect(() => {
        // if (userLoaded) navigation.navigate(userId ? 'Main' : 'Start')
        if (userLoaded) navigation.navigate('Start')
    }, [userLoaded])
    
    return (
        <View style={classes.centerV}>
            <ThemedText>iameric</ThemedText>
        </View>
    )
}