import React from 'react'
import { View } from 'react-native'
import {
    Mail,
    Screen,
    SimpleButton,
} from '@components'

export default props => {

    return (
        <Screen
            {...props}
            title='Mail'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <Mail />
                </View>
            </View>
        </Screen>
    )
}