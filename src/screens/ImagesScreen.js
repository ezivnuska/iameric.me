import React from 'react'
import { View } from 'react-native'
import { UserHeader } from './components'
import { Screen } from './components'
import { Images } from '@modules'
import { useApp } from '@app'

export default props => {

    const { user } = useApp()
    
    return (
        <Screen secure {...props}>

            <UserHeader username={props.route.params?.username || user?.username} {...props} />
                
            <View style={{ flexGrow: 1 }}>
                <Images />
            </View>

        </Screen>
    )
}