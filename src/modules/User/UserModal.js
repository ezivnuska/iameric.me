import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    useUser,
    UserImageUploader,
} from '.'
import {
    ModalHeader,
    UserImageDisplay,
} from '@components'
import { useImages } from '@images'
import Modal from 'react-native-modal'

const UserModal = ({ onSubmit = null }) => {

    const { uploading } = useImages()
    const {
        closeUserModal,
        // user,
        userModal,
        // setUserModal,
    } = useUser()

    const renderContent = () => {
        const { type, data } = userModal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <UserImageUploader data={data} />
                break
            case 'SHOWCASE':
                return <UserImageDisplay data={data} />
                break
            // case 'CAPTION':
            //     return <CaptionForm data={data} onCancel={onCancel} />
            //     break
            default:
        }
    }

    const renderModalHeader = () => {
        const { type, data } = userModal
        let title = null
        switch (type) {
            case 'IMAGE_UPLOAD':
                title = `Upload${uploading ? 'ing' : ''} Image`
                break
            case 'SHOWCASE':
                title = 'Showcase!'
                break
            // case 'CAPTION':
            //     return <CaptionForm data={data} onCancel={onCancel} />
            //     break
            default:
        }
        return (
            <ModalHeader 
                title={title}
                onClose={closeUserModal}
            />
        )
    }

    return (
        <Modal
            isVisible={userModal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={closeUserModal}
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
                    onPress={closeUserModal}
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
                    {userModal && renderModalHeader()}

                    {userModal && renderContent()}

                </View>
            </View>
        </Modal>
    )
}

export default UserModal