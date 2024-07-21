import React, { useMemo } from 'react'
import { View } from 'react-native'
import { UserHeader } from './components'
import { Screen } from './components'
import { Images } from '@modules'
import { useApp } from '@app'

export default props => {

    const { user } = useApp()
    
    return (
        <Screen {...props}>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 10,
                }}
            >

                <UserHeader username={props.route.params?.username || user.username} {...props} />
                    
                <View style={{ flexGrow: 1 }}>
                    <Images />
                </View>

            </View>

        </Screen>
    )
}