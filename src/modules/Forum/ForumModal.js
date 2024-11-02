import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
// import { FormContextProvider } from '@modules/Form'
import { Form } from '@components'
import Modal from 'react-native-modal'

const ForumModal = ({ modal, onCancel, onSubmit }) => {

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
                    {/* <FeedbackForm
                        fields={fields}
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                    /> */}

                    {/* <FormContextProvider> */}
                        <Form
                            title='Give Feedback'
                            fields={fields}
                            onCancel={onCancel}
                            onSubmit={onSubmit}
                            // submitForm={submitForm}
                        />
                    {/* </FormContextProvider> */}

                </View>
            </View>
        </Modal>
    )
}

export default ForumModal