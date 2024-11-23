import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { ActivityIndicator, ImagePicker, ModalHeader, UserImageDisplay } from '@components'
import Modal from 'react-native-modal'
import { useUser } from '.'

const UserModal = ({ onSubmit = null }) => {

    const {
        userModal,
        closeUserModal,
    } = useUser()

    const renderContent = () => {
        const { type, data } = userModal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <ImagePicker onComplete={closeUserModal} />
                // return <ImagePicker onComplete={onCancel} />
                break
            case 'SHOWCASE':
                return <UserImageDisplay data={data} onClose={closeUserModal} />
                break
            default:
        }
    }

    const renderModalHeader = () => {
        const { type, data } = userModal
        let title = null
        switch (type) {
            case 'IMAGE_UPLOAD':
                title = 'Upload Image'
                break
            case 'SHOWCASE':
                // title = 'Showcase!'
                break
            default:
        }
        return title ? (
            <ModalHeader 
                title={title}
                onClose={closeUserModal}
            />
        ) : null
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
            {/*
                background button absolutely
                positioned to fill screen
            */}

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

                    {userModal ? (
                        <View
                            style={{
                                flex: 1,
                                zIndex: 10,
                            }}
                        >

                            {renderModalHeader()}

                            <ScrollView
                                style={{
                                    flex: 1,
                                    zIndex: 1,
                                }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flex: 1 }}
                            >
                                {renderContent()}
                            </ScrollView>

                        </View>
                    ) : <ActivityIndicator size='medium' />}
                </View>
            </View>
        </Modal>
    )
}

export default UserModal