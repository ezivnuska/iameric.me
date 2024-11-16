import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import {
    ActivityIndicator,
    ModalHeader,
    UserImageDisplay,
} from '@components'
// import { CaptionForm } from './forms'
import {
    // ImageLoader,
    ImageUploader,
    useImages,
} from '.'
import Modal from 'react-native-modal'

const ImagesModal = ({ modal, onCancel, onSubmit }) => {

    const {
        uploading,
    } = useImages()

    const renderContent = () => {
        const { type, data } = modal
        switch (type) {
            case 'IMAGE_UPLOAD':
                return <ImageUploader data={data} />
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
                title = `Upload${uploading ? 'ing' : ''} Image`
                break
            case 'SHOWCASE':
                title = 'Image Detail'
                break
            default:
        }
        return title ? (
            <ModalHeader 
                title={title}
                onClose={onCancel}
            />
        ) : null
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
                        backgroundColor: '#fff',
                        zIndex: 100,
                    }}
                >
                    {modal ? (
                        <View style={{ flex: 1 }}>

                            {renderModalHeader()}

                            <ScrollView
                                style={{
                                    flex: 1,
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