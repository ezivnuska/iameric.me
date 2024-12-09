import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Form, ImagePickerMini, ModalHeader } from '@components'
import Modal from 'react-native-modal'
import { useApp } from '@context'
import { useUser } from '@context'
import { uploadImage } from '@utils/images'

const FeedModal = ({ modal, onCancel, onSubmit }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { dims } = useApp()
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
            deviceWidth={dims.width}
            deviceHeight={dims.height}
            animationType='fade'
            transparent={true}
            onRequestClose={onCancel}
            style={{
                // flex: 1,
                margin: 0,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
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
                        // flex: 1,
                        width: '92%',
                        maxWidth: 380,
                        marginHorizontal: 'auto',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        overflow: 'hidden',
                        zIndex: 100,
                    }}
                >

                    <View
                        style={{
                            flexGrow: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            gap: 10,
                        }}
                    >
                        <Form
                            title='Add Post'
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