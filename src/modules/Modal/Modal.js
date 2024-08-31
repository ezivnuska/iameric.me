import React, { useEffect, useMemo } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import Modal from 'react-native-modal'
import { useApp } from '@app'
import { ModalFactory, NewModal, useModal } from '@modal'
import { CameraView } from './components'

export default ({ fullscreen = false, transparent = false, ...props }) => {
    
    const { dims } = useApp()
    const { closeModal, modal } = useModal()

    const isCamera = useMemo(() => modal && modal.type === 'CAPTURE', [modal])

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

            {isCamera
                ? <CameraView />
                : (
                    <View
                        style={{
                            flex: 1,
                            position: 'relative',
                            justifyContent: 'flex-end',
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
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                overflow: 'hidden',
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                maxHeight: dims.height - 50,
                                width: dims.width,
                                maxWidth: 400,
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