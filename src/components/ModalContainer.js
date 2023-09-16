import React from 'react'
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    CloseButton,
    PanelView,
} from '.'
import main from '../styles/main'
import base from '../styles/base'

const ModalContainer = ({ children, closeModal = null, loading = null, label = null, ...props }) => {
    return (
        <Modal
            {...props}
        >
            <View style={[styles.container]}>
                {(label || closeModal) && (
                    <PanelView style={styles.modalHeader}>
                        {label ? <Text style={[main.heading, styles.label]}>{label}</Text> : null}
                        {closeModal && <CloseButton onPress={closeModal} iconStyle={{ color: base.primaryTextColor }} />}
                    </PanelView>
                )}

                <ScrollView style={styles.modalView}>{children}</ScrollView>
            </View>
        </Modal>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minWidth: 375,
        maxWidth: 450,
        height: '100%',
        backgroundColor: base.backgroundColor,
        marginHorizontal: 'auto',
        // marginTop: 15,
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    label: {
        flexBasis: 'auto',
        flexGrow: 1,
    },
    closeButton: {
        flexBasis: 'auto',
        flexGrow: 0,
        paddingTop: 2,
    },
    modalView: {
        height: '100%',
        // borderWidth: 1,
    },
})