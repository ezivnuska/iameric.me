import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { ActivityIndicator, ImagePicker,
    // ModalHeader,
    UserImageDisplay } from '@components'
// import { useUser } from '.'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-web-linear-gradient'

const UserModal = ({ modal, onClose, onSubmit = null }) => {

    // const {
    //     userModal,
    //     closeUserModal,
    // } = useUser()

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <ImagePicker onComplete={onClose} />
                break
            case 'SHOWCASE':
                return <UserImageDisplay data={data} onClose={onClose} />
                break
            default:
        }
    }

    // const renderModalHeader = () => {
    //     const { type, data } = modal
    //     let title = null
    //     switch (type) {
    //         case 'IMAGE_UPLOAD':
    //             // title = 'Upload Image'
    //             break
    //         case 'SHOWCASE':
    //             // title = 'Showcase!'
    //             break
    //         default:
    //     }
    //     return title ? (
    //         <ModalHeader 
    //             title={title}
    //             onClose={onClose}
    //         />
    //     ) : null
    // }

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

                    {modal ? (
                        <View
                            style={{
                                flex: 1,
                                zIndex: 10,
                                position: 'relative',
                            }}
                        >
                            {/* {renderModalHeader()} */}
                            {/* <LinearGradient
                                colors={[
                                    // 'rgba(0, 0, 0, 1.0)',
                                    'rgba(0, 0, 0, 0.9)',
                                    'rgba(0, 0, 0, 0.6)',
                                    'rgba(0, 0, 0, 0.3)',
                                    'rgba(0, 0, 0, 0.1)',
                                    'rgba(0, 0, 0, 0.0)',
                                ]}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    height: 100,
                                    zIndex: 50,
                                }}
                            />

                            <Pressable
                                onPress={onClose}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    zIndex: 100,
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                }}
                            >
                                <Icon
                                    name={'close'}
                                    size={40}
                                    color='#fff'
                                />
                            </Pressable> */}

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