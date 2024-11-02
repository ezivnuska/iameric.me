import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { Form } from '@components'
// import { FormContextProvider } from '@modules/Form'
import Modal from 'react-native-modal'

const FeedModal = ({ modal, onCancel, onSubmit }) => {

    const fields = [
        {
            label: 'New Post',
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
                        zIndex: 100,
                    }}
                >
                    {/* <FormContextProvider> */}
                        <Form
                            title='New Post'
                            fields={fields}
                            onCancel={onCancel}
                            onSubmit={onSubmit}
                        />
                    {/* </FormContextProvider> */}

                </View>
            </View>
        </Modal>
    )
}

export default FeedModal