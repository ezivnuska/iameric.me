import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import {
    ActivityIndicator,
    ModalHeader,
    UserImageDisplay,
} from '@components'
import { ImagePicker } from './components'
import { useApp } from '@app'
import Modal from 'react-native-modal'

const ImagesModal = ({ modal, onCancel, onSubmit }) => {

    const { dims } = useApp()

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <ImagePicker />
                break
            case 'SHOWCASE':
                return <UserImageDisplay data={data} />
                break
            default:
        }
    }

    const renderModalHeader = () => {
        const { type, data } = modal
        let title = null
        switch (type) {
            case 'IMAGE_UPLOAD':
                title = 'Upload Image'
                break
            case 'SHOWCASE':
                // title = 'Image Detail'
                break
            default:
        }
        return title && (
            <ModalHeader
                title={title}
                onClose={onCancel}
                color='#fff'
            />
        )
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
                {/*
                    background button absolutely
                    positioned to fill screen
                */}
                
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
                        backgroundColor: '#000',
                        zIndex: 100,
                    }}
                >
                    {modal ? (
                        <View style={{ flex: 1 }}>

                            {renderModalHeader()}

                            <ScrollView
                                style={{
                                    flex: 1,
                                    zIndex: 1,
                                }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    flex: 1,
                                }}
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

export default ImagesModal