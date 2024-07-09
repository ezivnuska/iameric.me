import React from 'react'
import { View } from 'react-native'
import {
    Cabinet,
    Screen,
} from '@components'
import {
    Socket,
} from '@modules'
import { useApp } from '@app'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    
    return (
        <Screen
            {...props}
            secure={false}
            title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>

                    <Cabinet
                        title='Socket Details'
                        closed={false}
                    >
                        <Socket />
                    </Cabinet>

                </View>

            </View>

        </Screen>
    )
}