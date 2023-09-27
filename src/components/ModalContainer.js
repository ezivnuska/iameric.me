import React from 'react'
import {
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import {
    CenteredContent,
    CloseButton,
    Heading,
} from '.'
import base from '../styles/base'
import layout from '../styles/layout'

const ModalContainer = ({ children, closeModal = null, loading = null, label = null, ...props }) => {
    return (
        <Modal
            {...props}
        >
            <CenteredContent>
                {(label || closeModal) && (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: 50,
                    }}>
                        {label && (
                            <Heading style={{
                                flexBasis: 'auto',
                                flexGrow: 1,
                            }}>
                                {label}
                            </Heading>
                        )}

                        {closeModal && (
                            <CloseButton
                                onPress={closeModal}
                                iconStyle={{
                                    marginHorizontal: layout.horizontalPadding,
                                    color: base.primaryTextColor,
                                }}
                            />
                        )}
                    </View>
                )}
                

                <ScrollView style={styles.modalView}>{children}</ScrollView>
            </CenteredContent>
        </Modal>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    closeButton: {
        flexBasis: 'auto',
        flexGrow: 0,
        paddingTop: 2,
    },
    modalView: {
        height: '100%',
        width: '100%',
        // borderWidth: 1,
    },
})