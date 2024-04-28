import React, { useEffect } from 'react'
import {
    CenteredVertical,
    ThemedText,
} from '@components'
import {
    useUser,
} from '@context'

export default props => {
    const { profile, userLoaded } = useUser()
    useEffect(() => {
        if (userLoaded) {
            if (profile) props.navigation.navigate('Auth')
            else props.navigation.navigate('Start')
        }
    }, [profile, userLoaded])
    
    return (
        <CenteredVertical>
            <ThemedText>Splash</ThemedText>
        </CenteredVertical>
    )
}