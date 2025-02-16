import React from 'react'
import { View, Pressable } from 'react-native'
import {
    AuthForm,
    BugForm,
    CaptionForm,
    DestroyForm,
    ImageCard,
    ImagePicker,
    MemoryForm,
    PostForm,
    Settings,
    Socket,
} from '@components'
import { useTheme } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal, onClose }) => {

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
                content = <ImagePicker data={data} />
                // fullscreen = true
                break
            case 'DESTROY':
                content = <DestroyForm data={data} />
                // fullscreen = true
                break
            case 'CAPTION':
                content = <CaptionForm data={data} />
                // fullscreen = true
                break
            case 'FEEDBACK':
                content = <PostForm data={data} />
                // fullscreen = true
                break
            case 'SETTINGS':
                // title = 'Settings'
                content = <Settings />
                break
            case 'SHOWCASE':
                content = <ImageCard data={data} />
                // content = <ImageShowcase data={data} />
                fullscreen = true
                break
            case 'SOCKETS':
                // title = 'Connected Users'
                content = <Socket />
                break
            default: {
                console.log('Modal not found', type)
                return null
            }
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: fullscreen ? 'stretch' : 'center',
                    width: '100%',
                    position: 'relative',
                    // backgroundColor: theme.colors.background,
                }}
            >
                <Pressable
                    onPress={onClose}
                    style={{
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        zIndex: 10,
                    }}
                />
                
                <View
                    style={{
                        width: fullscreen ? '100%' : '92%',
                        maxWidth: fullscreen ? null : 400,
                        marginHorizontal: 'auto',
                        zIndex: 100,
                    }}
                >
                    {content}
                </View>
            </View>
        )
    }

    return (
        <Modal
            isVisible={modal !== undefined}
            deviceWidth={dims.width}
            deviceHeight={dims.height}
            animationType='fade'
            transparent={false}
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