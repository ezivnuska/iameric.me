import React from 'react'
import { View } from 'react-native'
import {
    ActivityIndicator,
    // AuthForm,
    // BugForm,
    // ImageShowcase,
    // ImagePicker,
    // PostForm,
    // Scrollable,
    // Settings,
    // Socket,
    TextCopy,
} from '@components'
// import { ModalContainer, ModalHeader } from './components'
import { useTheme } from '@context'
import Modal from 'react-native-modal'

const BlackScreen = () => {
    return (
        <View style={{ flex: 1, background: '#000' }}>
            <ActivityIndicator label={`Game paused.\nPhone must be in portrait mode.`} />
        </View>
    )
}

const PlayModal = ({ modal, onClose }) => {

    const { dims, landscape } = useTheme()

    const renderModalContent = () => {

        if (!modal) return <TextCopy>Could not find modal content</TextCopy>
        
        const { type, data } = modal
        let content = null
        let fullscreen = false
        let title = null
        
        switch(type) {
            case 'PAUSED': content = <BlackScreen />; break
            // case 'BUG': content = <BugForm />; break
            // case 'IMAGE_UPLOAD':
            //     content = <ImagePicker data={data} />
            //     fullscreen = true
            //     break
            // case 'FEEDBACK':
            //     content = <PostForm data={data} />
            //     // fullscreen = true
            //     break
            // case 'SETTINGS':
            //     title = 'Settings'
            //     content = <Settings />
            //     break
            // case 'SHOWCASE':
            //     content = <ImageShowcase data={data} />
            //     fullscreen = true
            //     break
            // case 'SOCKETS':
            //     title = 'Connected Users'
            //     content = <Socket />
            //     break
            default: console.log('Play Modal not found', type)
        }

        return (
            <View style={{ flex: 1 }}>
                {/* {title && <ModalHeader title={title} onClose={onClose} />} */}
                {content}
                {/* {fullscreen ? content : <Scrollable>(content)</Scrollable>} */}
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