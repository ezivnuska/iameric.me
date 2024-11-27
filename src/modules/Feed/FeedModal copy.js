import React from 'react'
import { Pressable, View } from 'react-native'
import { Form, ModalHeader } from '@components'
import Modal from 'react-native-modal'

const FeedModal = ({ modal, onCancel, onSubmit }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'say something...',
            multiline: true,
        },
    ]

    return (
        <Modal
            isVisible={modal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={onCancel}
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
                    onPress={onCancel}
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
                    <ModalHeader
                        title='Create Post'
                        onClose={onCancel}
                    />


                    <View
                        style={{
                            flexGrow: 1,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Form
                            fields={fields}
                            onCancel={onCancel}
                            onSubmit={onSubmit}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default FeedModal