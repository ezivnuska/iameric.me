import React from 'react'
import { View } from 'react-native'
import {
    FocusView,
    Heading,
    ThemedText,
} from '@components'

export default () => (
    <View style={{ flex: 1 }}>
        <Heading title='Play' />
        <View
            style={{
                flex: 1,
            }}
        >
            <FocusView>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'red',
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'blue',
                    }}
                />
            </FocusView>
        </View>
    </View>
)