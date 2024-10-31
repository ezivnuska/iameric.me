import React from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import FormFactory from '@form'
import Modal from 'react-native-modal'
import { useApp } from '@app'
import { useModal } from '@modal'

const ModalView = () => {
    
    const { closeModal, modal } = useModal()

    // const isCamera = useMemo(() => (modal && modal.type === 'CAPTURE'), [modal])

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
                    <FormFactory
                        type={modal.type}
                        data={modal.data}
                    />
                </View>
            </View>
        </Modal>
    ) : null
}

export default ModalView