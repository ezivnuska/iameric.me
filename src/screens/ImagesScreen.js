import React from 'react'
import { View } from 'react-native'
import {
    Heading,
    Screen,
} from '@components'
import { Images } from '@modules'
import { useApp } from '@app'

export default props => {

    const { user } = useApp()
    
    return (
        <Screen {...props}>

            <Heading title={user ? user.username : null} />
            
            <View style={{ flexGrow: 1 }}>
                <Images />
            </View>

        </Screen>
    )
}