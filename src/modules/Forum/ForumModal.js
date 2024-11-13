import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    Form,
    ModalHeader,
    ThemedText,
} from '@components'
import Modal from 'react-native-modal'
import { useForum } from '@forum'

const ForumModal = ({ onCancel, onSubmit }) => {

    const { forumModal } = useForum()

    const fields = [
        {
            label: 'Give Feedback',
            name: 'text',
            placeholder: 'tell us where it hurts...',
            multiline: true,
        },
    ]

    return (
        <Modal
            isVisible={forumModal !== undefined}
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

                    {(forumModal && forumModal.data) && (
                        <View
                            style={{
                                flexGrow: 0,
                                flexBasis: 'auto',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 3,
                                backgroundColor: '#0cf',
                            }}
                        >
                            <ThemedText>{forumModal.data.text}</ThemedText>
                        </View>
                    )}
                    
                    <ModalHeader
                        title={(forumModal && forumModal.data) ? 'Respond' : 'Give Feedback'}
                        onClose={onCancel}
                    />

                    <View style={{ flexGrow: 1 }}>
                        <Form
                            // title='Form'
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

export default ForumModal