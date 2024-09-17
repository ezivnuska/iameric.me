import React, { useState } from 'react'
import { View } from 'react-native'
import {
    Counter,
    // FocusView,
} from '@components'
import { Puzzle } from './components'

export default () => {

    const [ level, setLevel ] = useState(4)

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
                    min={3}
                    max={5}
                    onChange={setLevel}
                />
            </View>
            <Puzzle level={level} />
        </View>
    )
}