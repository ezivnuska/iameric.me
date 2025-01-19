import React from 'react'
import { View } from 'react-native'
import { ModalContainer, PostForm } from '@components'
import { useApp } from '@context'
import Modal from 'react-native-modal'

const FeedModal = ({ modal, onClose }) => {

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
                    <PostForm data={modal && modal.data} />
                </ModalContainer>
            </View>
        </Modal>
    )
}

export default FeedModal