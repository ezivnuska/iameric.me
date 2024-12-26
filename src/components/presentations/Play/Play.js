import React, { useState } from 'react'
import { View } from 'react-native'
import { Tiles } from './games'
import { usePlay } from '@context'
import { PlayModal } from './components'

const Play = () => {

    const { playModal, closePlayModal } = usePlay()

    const [maxWidth, setMaxWidth] = useState(null)

    const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}

    return (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {maxWidth && <Tiles gameSize={maxWidth} />}

            <PlayModal
                modal={playModal}
                onClose={closePlayModal}
            />
        </View>
    )
}

export default Play