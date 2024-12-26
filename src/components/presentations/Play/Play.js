import React, { useState } from 'react'
import { View } from 'react-native'
import { Tiles } from './games'

const Play = () => {
    const [maxWidth, setMaxWidth] = useState(null)

    const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}

    return (
        <View style={{ flex: 1 }}>
            <View
                onLayout={onLayout}
                style={{ flex: 1 }}
            >
                {maxWidth && <Tiles gameSize={maxWidth} />}
            </View>
        </View>
    )
}

export default Play