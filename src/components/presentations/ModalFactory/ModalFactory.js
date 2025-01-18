import React from 'react'
import { View } from 'react-native'
import {
    AuthForm,
    // BugForm,
    ImagePicker,
    ImageShowcase,
    // PostForm,
    Settings,
    Socket,
} from '@components'
import { ModalContainer, ModalHeader } from './components'
import { useApp } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal, onClose }) => {

    const { dims, landscape } = useApp()

    const renderModalContent = () => {
        
        const { type, data } = modal
        let content = null
        let fullscreen = false
        let title = null
        
        switch(type) {
            case 'AUTH': content = <AuthForm />; break
            // case 'BUG': content = <BugForm />; break
            case 'IMAGE_UPLOAD':
                content = <ImagePicker data={data} />
                fullscreen = true
                break
            // case 'FEEDBACK':
            //     content = <PostForm data={data} />
            //     // fullscreen = true
            //     break
            case 'SETTINGS':
                title = 'Settings'
                content = <Settings />
                break
            case 'SHOWCASE':
                content = <ImageShowcase data={data} />
                fullscreen = true
                break
            case 'SOCKETS':
                title = 'Connected Users'
                content = <Socket />
                break
            default: console.log('Modal not found', type)
        }

        return (
            <ModalContainer
                fullscreen={fullscreen}
                landscape={landscape}
                onClose={onClose}
            >
                {title && <ModalHeader title={title} onClose={onClose} />}
                {content}
                {/* {fullscreen ? content : <Scrollable>(content)</Scrollable>} */}
            </ModalContainer>
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
            <View style={{ flex: 1 }}>
                {modal && renderModalContent()}
            </View>
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
        </Modal>
    )
}

export default ModalFactory