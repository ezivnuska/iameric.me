import React, { useMemo } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { CameraView, ModalFactory } from './components'
import Modal from 'react-native-modal'
import { useModal } from '@modal'

const FullScreenModal = ({ children }) => {
    
    const { closeModal} = useModal()

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

const StandardModal = () => {

    const { closeModal} = useModal()
    
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

            <ModalFactory />
        </View>
    )
}

export default () => {
    
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
                    <FullScreenModal>
                        <CameraView />
                    </FullScreenModal>
                    
                )
                : <StandardModal />
            }
        </Modal>
    )
}