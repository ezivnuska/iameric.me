import React from 'react'
import { View } from 'react-native'
import { Screen } from '@components'
import { Images } from '@modules'
import { useApp } from '@app'

export default props => {

    const { user } = useApp()
    
    return (
        <Screen
            {...props}
            title={user ? user.username : null}
            profile
        >

            <View style={{ flexGrow: 1 }}>
                <Images />
            </View>

        </Screen>
    )
}