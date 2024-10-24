import React, { useState } from 'react'
import { View } from 'react-native'
import { PlayContextProvider } from '.'
import { Tiles } from './games'

const Play = () => {
    const [maxWidth, setMaxWidth] = useState(null)
    const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}
    return (
        <PlayContextProvider>
            <View
                onLayout={onLayout}
                style={{ flex: 1, gap: 10 }}
            >
                {maxWidth && <Tiles gameSize={maxWidth} />}
            </View>
        </PlayContextProvider>
    )
}

export default Play