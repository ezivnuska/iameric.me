import React from 'react'
import { View } from 'react-native'
import {
    LoadingView,
    Profile,
    TitleBar,
    Screen,
} from '@components'
import { useUser } from '@context'
import { classes } from '@styles'

export default props => {

    const { profile, userLoading } = useUser()
    
    if (userLoading) return <LoadingView loading='Loading profile.' />

    return (
        <Screen {...props}>
            {profile ? (
                <>
                    <TitleBar title={profile.username} />
                    <View style={classes.paddingH}>
                        <Profile />
                    </View>
                </>
            ) : <LoadingView loading='Loading profile...' />}
        </Screen>
    )
}