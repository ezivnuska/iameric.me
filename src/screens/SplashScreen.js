import React, { useEffect } from 'react'
import {
    CenterVertical,
    ThemedText,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'

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
            <ThemedText>iameric</ThemedText>
        </CenterVertical>
    )
}