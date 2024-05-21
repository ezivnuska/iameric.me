import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
    useUser,
} from '@context'
import { Pressable } from 'react-native'
import { classes } from '@styles'

export default ({ navigation }) => {
    const { userId } = useApp()
    const { userLoaded } = useUser()

    useEffect(() => {
        console.log('SPLASH')
    }, [])

    useEffect(() => {
        // if (userLoaded) navigation.navigate(userId ? 'Auth' : 'Start')
    }, [userLoaded])
    
    return (
        <View style={classes.centerV}>
            <Pressable
                onPress={() => navigation.navigate(userId ? 'Main' : 'Start')}
                disabled={!userLoaded}
            >
                <ThemedText>iameric</ThemedText>
            </Pressable>
        </View>
    )
}