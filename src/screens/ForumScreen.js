import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    Forum,
    Screen,
    SimpleButton,
} from '@components'

export default props => {

    return (
        <Screen
            {...props}
            title='Forum'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <Forum />
                </View>
            </View>
        </Screen>
    )
}