import React, { useMemo } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import Modal from 'react-native-modal'
import { useApp } from '@app'
import { useModal } from '@modal'
import { CameraView, ModalFactory } from './components'

export default ({ fullscreen = false, transparent = false }) => {
    
    const { dims } = useApp()
    const { closeModal, modal } = useModal()

    const isCamera = useMemo(() => (modal && modal.type === 'CAPTURE'), [modal])

    return (
        <Modal
            isVisible={modal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={closeModal}
            style={{
                flex: 1,
                margin: 0,
            }}
        >
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            {isCamera
                ? (
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            maxWidth: 400,
                            marginHorizontal: 'auto',
                        }}
                    >
                        <CameraView />
                    </View>
                    
                )
                : (
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            position: 'relative',
                            justifyContent: 'center',
                        }}
                    >
                        <Pressable
                            onPress={closeModal}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                zIndex: 1,
                            }}
                        />

                        <View
                            style={{
                                flexBasis: 'auto',
                                flexGrow: 0,
                                flexShrink: 1,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                // borderTopLeftRadius: 20,
                                // borderTopRightRadius: 20,
                                overflow: 'hidden',
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                maxHeight: dims.height - 100,
                                width: dims.width - 10,
                                maxWidth: 390,
                                marginHorizontal: 'auto',
                                zIndex: 100,
                            }}
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    flex: 1,
                                }}
                                contentContainerStyle={{
                                    flex: 1,
                                    width: '100%',
                                    maxWidth: 400,
                                    marginHorizontal: 'auto',
                                }}
                            >
                                <ModalFactory />
                            </ScrollView>
                        </View>
                    </View>
                )
            }
        </Modal>
    )
}