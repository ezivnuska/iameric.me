import React from 'react'
import { View, Pressable } from 'react-native'
import {
    AddImageButton,
    AuthForm,
    BugForm,
    CaptionForm,
    DestroyForm,
    ImageCard,
    MemoryForm,
    MemoryImageSelector,
    PostForm,
    Settings,
    Socket,
} from '@components'
import { useTheme } from '@context'
import Modal from 'react-native-modal'

const ModalFactory = ({ modal, onClose }) => {

    const { dims, landscape, theme } = useTheme()

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
                // fullscreen = true
                break
            case 'MEMORY_IMAGE':
                content = <MemoryImageSelector data={data} />
                // fullscreen = true
                break
            case 'IMAGE_UPLOAD':
                content = <AddImageButton data={data} />
                // content = <ImagePicker data={data} />
                break
            case 'DESTROY':
                content = <DestroyForm data={data} />
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
                content = <Settings />
                // fullscreen = true
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

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: fullscreen ? 'stretch' : 'center',
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Pressable
                    onPress={onClose}
                    disabled={fullscreen}
                    style={{
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        zIndex: 10,
                    }}
                />

                <View
                    style={[{
                        flex: 1,
                        zIndex: 100,
                    },
                    !fullscreen && {
                        width: '90%',
                        maxWidth: 375,
                        marginHorizontal: 'auto',
                    }]}
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
            transparent={true}
            onRequestClose={onClose}
            style={{ margin: 0 }}
        >
            <View style={{ flex: 1 }}>
                {modal && renderModalContent()}
            </View>
        </Modal>
    )
}

export default ModalFactory