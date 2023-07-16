import React from 'react'
import {
    Modal,
    StyleSheet,
    View,
} from 'react-native'
import { ButtonPrimary } from '.'

const ModalContainer = ({ children, closeModal, ...props }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                {...props}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children}
                        <ButtonPrimary
                            label='Cancel'
                            onPress={closeModal}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})