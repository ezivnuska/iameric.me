import React from 'react'
import { Pressable, View } from 'react-native'
import { ContactImageDisplay, ModalHeader } from '@components'
import { useContacts } from '@contacts'
import Modal from 'react-native-modal'

const ContactsModal = () => {

    const {
        contact,
        contactModal,
        closeContactModal,
    } = useContacts()

    const renderContent = () => {
        const { type, data } = contactModal
        switch (type) {
            case 'SHOWCASE':
                return <ContactImageDisplay data={data} user={contact} onClose={closeContactModal} />
                break
            default:
        }
    }

    const renderModalHeader = () => {
        const { type, data } = contactModal
        let title = null
        switch (type) {
            case 'SHOWCASE':
                // title = 'Showcase!'
                break
            default:
        }
        return title ? (
            <ModalHeader 
                title={title}
                onClose={closeContactModal}
            />
        ) : null
    }

    return (
        <Modal
            isVisible={contactModal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={closeContactModal}
            style={{ flex: 1, margin: 0 }}
        >
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Pressable
                    onPress={closeContactModal}
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
                        backgroundColor: '#fff',
                        zIndex: 100,
                    }}
                >
                    {contactModal && renderModalHeader()}

                    {contactModal && renderContent()}

                </View>
            </View>
        </Modal>
    )
}

export default ContactsModal