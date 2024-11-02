import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { PostForm } from './forms'
import Modal from 'react-native-modal'

const FeedModal = ({ modal, onCancel, onSubmit }) => {

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
                    <PostForm
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />

                </View>
            </View>
        </Modal>
    )
}

export default FeedModal