import React from 'react'
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CloseOutlined } from '@ant-design/icons'

const ModalContainer = ({ children, closeModal, label = null, ...props }) => {
    return (
        <View style={styles.centeredView}>
            
            <Modal
                {...props}
            >
                <View style={styles.modalHeader}>

                    {label ? <Text style={styles.label}>{label}</Text> : null}
                    
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeModal}
                    >
                        <CloseOutlined style={{ color: '#000', fontSize: 24 }} />
                    </TouchableOpacity>

                </View>

                <ScrollView style={styles.modalView}>
                    {children}
                </ScrollView>

            </Modal>

        </View>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
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
        // backgroundColor: 'white',
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