import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import {
    AddImageButton,
    AuthForm,
    BugForm,
    CaptionForm,
    DestroyForm,
    ImageCard,
    MemoryForm,
    PostForm,
    Settings,
    Socket,
} from '@components'
import { useModal, useTheme } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal }) => {

    const { clearModals } = useModal()
    const { dims, theme } = useTheme()

    const renderModalContent = () => {
        
        const { type, data } = modal
        let content = null
        let fullscreen = false
        
        switch(type) {
            case 'AUTH':
                content = <AuthForm />
                break
            case 'BUG':
                content = <BugForm />
                break
            case 'MEMORY':
                content = <MemoryForm data={data} />
                break
            case 'IMAGE_UPLOAD':
                content = <AddImageButton data={data} />
                break
            case 'DESTROY':
                content = <DestroyForm data={data} />
                break
            case 'CAPTION':
                content = <CaptionForm data={data} />
                break
            case 'FEEDBACK':
                content = <PostForm data={data} />
                break
            case 'SETTINGS':
                content = <Settings />
                break
            case 'SHOWCASE':
                content = <ImageCard data={data} />
                fullscreen = true
                break
            case 'SOCKETS':
                content = <Socket />
                break
            default: {
                console.log('Modal not found', type)
                return null
            }
        }
        const defaultStyles = [{
            marginVertical: 10,
            maxHeight: dims.height * 0.9,
            width: '90%',
            maxWidth: 375,
            marginHorizontal: 'auto',
            borderRadius: 24,
            backgroundColor: theme.colors.background,
            // flex: 1,
        }, shadow]

        const fullscreenStyles = {
            flex: 1,
            alignItems: 'stretch',
        }

        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={[fullscreen
                    ? fullscreenStyles
                    : defaultStyles,
                ]}
            >
                {content}
            </KeyboardAvoidingView>
        )
    }

    const shadow = {
        shadowColor: theme.colors.onBackground,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 7,
        elevation: 1,
    }

    return (
        <Modal
            isVisible={modal !== undefined}
            deviceWidth={dims.width}
            deviceHeight={dims.height}
            animationType='fade'
            transparent={true}
            onRequestClose={clearModals}
            style={{ margin: 0 }}
            onBackdropPress={clearModals}
            backdropColor={theme.colors.background}
            backdropOpacity={0.9}
            avoidKeyboard={true}
        >
            {modal
                ? renderModalContent()
                : <View />
            }
        </Modal>
    )
}

export default ModalFactory