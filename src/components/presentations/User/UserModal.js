import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { ActivityIndicator, ImagePicker, UserImageDisplay } from '@components'
import Modal from 'react-native-modal'

const UserModal = ({ modal, onClose, onSubmit = null }) => {

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <ImagePicker onClose={onClose} avatar={data?.avatar} />//key={`picker-${Date.now()}`}
                break
            case 'SHOWCASE':
                return <UserImageDisplay data={data} onClose={onClose} />
                break
            default:
        }
    }

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
                        backgroundColor: '#000',
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