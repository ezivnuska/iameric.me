import React from 'react'
import { View } from 'react-native'
import { Tiles } from './games'
import { usePlay } from '@context'
import { PlayModal } from './components'

const Play = () => {

    const { playModal, closePlayModal } = usePlay()

    return (
        <View style={{ flex: 1 }}>
            <Tiles />

            <PlayModal
                modal={playModal}
                onClose={closePlayModal}
            />
        </View>
    )
}

export default Play