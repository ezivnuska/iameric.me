import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { CaptionForm } from '@forms'
import {
    UserImageLoader,
    UserImageUploader,
} from '.'
import Modal from 'react-native-modal'

const UserModal = ({ modal, onCancel, onSubmit }) => {

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <UserImageUploader data={data} />
                break
            case 'SHOWCASE':
                return <UserImageLoader data={data} />
                break
            case 'CAPTION':
                return <CaptionForm data={data} onCancel={onCancel} />
                break
            default:
        }
    }

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

                    {modal && renderContent()}

                </View>
            </View>
        </Modal>
    )
}

export default UserModal