import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Form, ImagePickerMini, ModalHeader, SimpleButton } from '@components'
import Modal from 'react-native-modal'
import { useUser } from '@user'
import { uploadImage } from '@utils/images'

const FeedModal = ({ modal, onCancel, onSubmit }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { setUploading } = useUser()

    const [imageData, setImageData] = useState(null)

    const handleUpload = async () => {
        
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        setUploading(true)
        const image = await uploadImage({ ...imageData })
        setUploading(false)
        
        if (image) return image
        else {
            console.log('error uploading image')
            return null
        }
    }

    const handleSubmit = async data => {
        let postData = data
        console.log('postData', postData)
        if (imageData) {
            console.log('imageData', imageData)
            const image = await handleUpload()
            console.log('image', image)
            if (image) {
                postData = {
                    ...postData,
                    images: [image._id],
                }
            }
        }
        
        console.log('postData', postData)
        onSubmit(postData)
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
                        backgroundColor: '#fff',
                        zIndex: 100,
                    }}
                >
                    <ModalHeader
                        title='Create Post'
                        onClose={onCancel}
                    />


                    <View
                        style={{
                            flexGrow: 1,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Form
                            fields={fields}
                            onCancel={onCancel}
                            onSubmit={handleSubmit}
                        />
                        
                        <ImagePickerMini onSelection={setImageData} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default FeedModal