import React from 'react'
import { Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useTheme } from '@context'
import Modal from 'react-native-modal'

const BlackScreen = () => {
    return (
        <View style={{ flex: 1, background: '#000' }}>
            <ActivityIndicator />
        </View>
    )
}

const PlayModal = ({ modal, onClose }) => {

    const { dims } = useTheme()

    const renderModalContent = () => {

        if (!modal) return <Text>Could not find modal content</Text>
        
        const { type, data } = modal
        let content = null
        
        switch(type) {
            case 'PAUSED': content = <BlackScreen />; break
            default: console.log('Play Modal not found', type)
        }

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        )
    }

    return (
        <Modal
            isVisible={modal !== undefined}
            deviceWidth={dims.width}
            deviceHeight={dims.height}
            animationType='fade'
            transparent={true}
            onRequestClose={onClose}
            style={{ margin: 0 }}
        >
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            {renderModalContent()}
        </Modal>
    )
}

export default PlayModal