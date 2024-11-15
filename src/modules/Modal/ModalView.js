import React from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import { ModalHeader } from '@components'
import {
    Auth,
    Caption,
    Settings,
    Socket,
} from '@modules'
import FormFactory from '@form'
import Modal from 'react-native-modal'
import { useModal } from '@modal'

const ModalView = () => {
    
    const { closeModal, modal } = useModal()
    
    const renderModalContent = () => {
        const {type, data } = modal
        // console.log('ModalView', type, data)
        switch(type) {
            case 'AUTH': return <Auth />; break
            case 'SETTINGS': return <Settings />; break
            case 'SOCKETS': return <Socket />; break
            default: {
                console.log('Ouch', type)
                // return <FormFactory modal={modal} />
            }
        }
    }

    const renderModalHeader = type => {
        let title
        switch(type) {
            case 'AUTH': title = 'Who are You?'; break
            case 'SETTINGS': title = 'Settings'; break
            case 'SOCKETS': title = 'Sockets'; break
            default: title = ''
        }
        return <ModalHeader title={title} onClose={closeModal} />
    }
    return (
        <Modal
            isVisible={modal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={closeModal}
            style={{
                flex: 1,
                margin: 0,
            }}
        >
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Pressable
                    onPress={closeModal}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />

                {modal && (
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
                        {renderModalHeader(modal.type)}
                        <View
                            style={{
                                flex: 1,
                                paddingBottom: 10,
                                paddingHorizontal: 10,
                            }}
                        >
                            {renderModalContent()}
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    )
}

export default ModalView