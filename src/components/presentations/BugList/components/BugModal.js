import React from 'react'
import { View } from 'react-native'
import { BugForm } from './'
import { ModalContainer } from '@components'
import { useApp } from '@context'
import Modal from 'react-native-modal'

const BugModal = ({ modal, onClose }) => {

    const { dims, landscape } = useApp()

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
                <ModalContainer
                    landscape={landscape}
                    onClose={onClose}
                >
                    <BugForm />
                </ModalContainer>
            </View>
        </Modal>
    )
}

export default BugModal