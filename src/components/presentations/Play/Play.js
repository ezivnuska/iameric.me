import React, { useMemo, useState } from 'react'
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

    const [level, setLevel] = useState(4)

    const changeLevel = () => {
        setLevel(level === 4 ? 3 : 4)
    }

    return (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {maxWidth && <Tiles gameSize={maxWidth} level={level} changeLevel={changeLevel} />}

            <PlayModal
                modal={playModal}
                onClose={closePlayModal}
            />
        </View>
    )
}

export default Play