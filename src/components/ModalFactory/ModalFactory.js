import React from 'react'
import { ScrollView } from 'react-native'
import { AuthForm, BugForm, TextCopy, ImagePicker, ImageDisplay, Settings, Socket, PostForm } from '@components'
import { ModalContainer, ModalHeader } from './components'
import { useApp } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal, onClose }) => {

    const { dims } = useApp()

    const renderModalContent = () => {

        if (!modal) return <TextCopy>Could not find modal content</TextCopy>
        
        const { type, data } = modal
        let content = null
        let fullscreen = false
        let title = null
        
        switch(type) {
            case 'AUTH': content = <AuthForm />; break
            case 'BUG': content = <BugForm />; break
            case 'IMAGE_UPLOAD':
                content = <ImagePicker data={data} />
                fullscreen = true
                break
            case 'FEEDBACK':
                content = <PostForm data={data} />
                // fullscreen = true
                break
            case 'SETTINGS':
                title = 'Settings'
                content = <Settings />
                break
            case 'SHOWCASE':
                content = <ImageDisplay data={data} />
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
                onClose={onClose}
            >
                {title && <ModalHeader title={title} onClose={onClose} />}
                {content}
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
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            <ScrollView
                style={{
                    flex: 1,
                    width: '100%',
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                }}
            >
                {renderModalContent()}

            </ScrollView>
        </Modal>
    )
}

export default ModalFactory