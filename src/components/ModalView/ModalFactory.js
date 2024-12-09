import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { AuthForm, BugForm, DefaultText, ImagePicker, ImageDisplay, Settings, Socket } from '@components'
import { ModalContainer } from './components'
import { useApp } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal, onClose }) => {

    const { dims } = useApp()

    const renderModalContent = () => {

        if (!modal) return <DefaultText>Could not find modal content</DefaultText>
        
        const { type, data } = modal
        let content = null
        let fullscreen = false
        
        switch(type) {
            case 'AUTH': content = <AuthForm />; break
            case 'BUG': content = <BugForm />; break
            case 'IMAGE_UPLOAD':
                content = <ImagePicker data={data} />
                fullscreen = true
                break
            case 'SETTINGS': content = <Settings />; break
            case 'SHOWCASE':
                content = <ImageDisplay data={data} />
                fullscreen = true
                break
            case 'SOCKETS': content = <Socket />; break
            default: console.log('Modal not found', type)
        }
        
        return (
            <ModalContainer
                fullscree={fullscreen}
                onClose={onClose}
            >
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