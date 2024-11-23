import React from 'react'
import { Pressable, View } from 'react-native'
import { ContactImageDisplay, ModalHeader } from '@components'
import Modal from 'react-native-modal'

const ContactModal = ({ user, modal, onClose, onSubmit = null }) => {

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'SHOWCASE':
                return <ContactImageDisplay data={data} user={user} onClose={onClose} />
                break
            default:
        }
    }

    const renderModalHeader = () => {
        const { type, data } = modal
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
                onClose={onClose}
            />
        ) : null
    }

    return (
        <Modal
            isVisible={modal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={onClose}
            style={{
                flex: 1,
                margin: 0,
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Pressable
                    onPress={onClose}
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
                    {modal && renderModalHeader()}

                    {modal && renderContent()}

                </View>
            </View>
        </Modal>
    )
}

export default ContactModal