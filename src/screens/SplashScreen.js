import React, { useEffect } from 'react'
import {
    CenterVertical,
    ThemedText,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'
import { Pressable } from 'react-native'

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
        <CenterVertical>
            <Pressable
                onPress={() => navigation.navigate(userId ? 'Main' : 'Start')}
                disabled={!userLoaded}
            >
                <ThemedText>iameric</ThemedText>
            </Pressable>
        </CenterVertical>
    )
}