import React from 'react'
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CenteredLoader,
} from '.'
import { CloseOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'
import base from '../styles/base'

const ModalContainer = ({ children, closeModal = null, loading = null, label = null, ...props }) => {
    return (
        <Modal
            {...props}
        >
            {!loading
                ? (
                    <View style={styles.container}>
                        {(label && closeModal) && (
                            <View style={styles.modalHeader}>
                            
                                {label ? <Text style={[defaultStyles.heading, styles.label]}>{label}</Text> : null}

                                {closeModal && <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <CloseOutlined style={{ color: base.primaryTextColor, fontSize: 24 }} />
                                </TouchableOpacity>}

                            </View>
                        )}

                        <ScrollView style={styles.modalView}>
                            {children}
                        </ScrollView>
                    </View>
                ) : <CenteredLoader activity />
            }

        </Modal>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: base.backgroundColor,
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    label: {
        flexBasis: 'auto',
        flexGrow: 1,
        fontSize: 24,
        fontWeight: 600,
    },
    closeButton: {
        flexBasis: 'auto',
        flexGrow: 0,
        paddingTop: 2,
    },
    modalView: {
        margin: 10,
        // borderRadius: 20,
        // padding: 35,
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
})