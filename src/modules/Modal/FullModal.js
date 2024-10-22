import React from 'react'
import Modal from 'react-native-modal'

export default ({ children, ...props }) => (
    <Modal
        {...props}
        animationType='fade'
        transparent={true}
        style={{
            flex: 1,
            justifyContent: 'flex-end',
            margin: 0,
            position: 'relative',
        }}
    >
        {children}
    </Modal>
)