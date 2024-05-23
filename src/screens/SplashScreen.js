import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
    useUser,
} from '@context'
import { classes } from '@styles'

export default ({ navigation }) => {
    const { userId } = useApp()
    const { userLoaded } = useUser()

    useEffect(() => {
        if (userLoaded) navigation.navigate(userId ? 'Main' : 'Start')
    }, [userLoaded])
    
    return (
        <View style={classes.centerV}>
            <ThemedText>iameric</ThemedText>
        </View>
    )
}