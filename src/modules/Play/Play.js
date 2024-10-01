import React, { useState } from 'react'
import { View } from 'react-native'
import {
    Counter,
    // FocusView,
} from '@components'
import { Playground } from './components'
// import { Puzzle } from './components'
// import {
//     GestureHandlerRootView,
// } from 'react-native-gesture-handler'

export default () => {

    const [ level, setLevel ] = useState(1)

    return (
        <View
            style={{
                flex: 1,
                gap: 10,
            }}
        >
            {/* <FocusView /> */}
            <View
                style={{
                    flexGrow: 0,
                }}
            >
                <Counter
                    label='Level'
                    value={level}
                    min={1}
                    max={3}
                    onChange={value => setLevel(value)}
                />
            </View>
            
            <Playground level={level + 2} />
            {/* <GestureHandlerRootView> */}
                {/* <Puzzle level={level + 2} /> */}
            {/* </GestureHandlerRootView> */}
        </View>
    )
}