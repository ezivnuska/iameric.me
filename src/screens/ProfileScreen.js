import React from 'react'
import { View } from 'react-native'
import {
    LoadingView,
    Profile,
    TitleBar,
    Screen,
} from '@components'
import { useApp } from '@context'
import { classes } from '@styles'

export default props => {

    const { profile, appLoading } = useApp()
    
    if (appLoading) return <LoadingView loading='Loading profile.' />

    return (
        <Screen {...props}>
            {profile ? (
                <>
                    <TitleBar title={profile.username} />
                    <View style={classes.paddingH}>
                        <Profile profile={profile} />
                    </View>
                </>
            ) : <LoadingView loading='Loading profile...' />}
        </Screen>
    )
}