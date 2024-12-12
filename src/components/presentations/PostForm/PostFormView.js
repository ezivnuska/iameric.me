import React, { useState } from 'react'
import { View } from 'react-native'
import { Form, ImagePickerMini } from '@components'

const PostFormView = ({ fields, onCancel, onSubmit }) => {

    const [imageData, setImageData] = useState(null)

    const handleSubmit = async data => {
        console.log('submitting new post', data)
        onSubmit(data, imageData)
    }

    return (
        <View
            style={{
                // flexGrow: 1,
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
    )
}

export default PostFormView