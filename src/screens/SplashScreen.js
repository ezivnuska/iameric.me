import React, { useEffect } from 'react'
import {
    CenterVertical,
    ThemedText,
} from '@components'
import {
    useUser,
} from '@context'

export default ({ navigation }) => {
    const { userLoaded } = useUser()

    useEffect(() => {
        console.log('SPLASH')
    }, [])
    // useEffect(() => {
    //     if (userLoaded) navigation.navigate('Auth')
    //     else navigation.navigate('Start')
    // }, [userLoaded])
    
    return (
        <CenterVertical>
            <ThemedText>Splash</ThemedText>
        </CenterVertical>
    )
}