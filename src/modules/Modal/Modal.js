import React, { useMemo } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import { CameraView, ModalFactory } from './components'
import FormFactory from '@form'
import Modal from 'react-native-modal'
import { useApp } from '@app'
import { useModal } from '@modal'

const FullScreenModal = ({ children }) => {
    
    const { closeModal } = useModal()

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                position: 'relative',
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
                    flex: 1,
                    width: '100%',
                    maxWidth: 400,
                    marginHorizontal: 'auto',
                    zIndex: 100,
                }}
            >
                {children}
            </View>
        </View>
    )
}

const StandardModal = ({ type, data, closeModal }) => {
    const { dims } = useApp()
    return (
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
                    <FormFactory type={type} data={data} />
                </ScrollView>
            </View>
            {/* <ModalFactory /> */}
        </View>
    )
}

export default () => {
    
    const { closeModal, modal } = useModal()

    const isCamera = useMemo(() => (modal && modal.type === 'CAPTURE'), [modal])

    return modal ? (
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
                    <FullScreenModal>
                        <CameraView />
                    </FullScreenModal>
                    
                )
                : (
                    <StandardModal
                        closeModal={closeModal}
                        type={modal.type}
                        data={modal.data}
                    />
                )
            }
        </Modal>
    ) : null
}