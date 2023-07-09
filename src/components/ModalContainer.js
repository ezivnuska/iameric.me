import React from 'react'
import {
    Modal,
} from 'react-native'
import { ButtonPrimary } from '.'

const ModalContainer = ({ children, closeModal, ...props }) => {
    return (
        <Modal
            {...props}
        >
            {children}
            <ButtonPrimary
                label='Cancel'
                onPress={closeModal}
            />
        </Modal>
    )
}

export default ModalContainer