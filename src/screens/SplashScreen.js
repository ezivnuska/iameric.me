import React, { useEffect } from 'react'
import {
    Screen,
} from '.'
import {
    CenteredView,
    ThemedText,
} from '@components'
import {
    useUser,
} from '@context'

export default props => {
    const { profile, userLoaded } = useUser()
    useEffect(() => {
        console.log('route............', props.route)
        if (profile) console.log('profile', profile)
        if (profile) console.log('userLoaded', userLoaded)
        if (userLoaded) {
            if (profile) props.navigation.navigate('Auth')
            else props.navigation.navigate('Start')
        }
    }, [profile, userLoaded])
    return (
        <CenteredView>
            <ThemedText>Splash</ThemedText>
        </CenteredView>
    )
}