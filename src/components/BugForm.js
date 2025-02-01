import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Card, IconButton } from 'react-native-paper'
// import { ImagePickerMini } from '@smart'
import { Form } from '@components'
import { useBugs, useModal, useSocket } from '@context'
// import { uploadImage } from '@utils/images'
import { createEntry } from '@utils/bugs'

const BugForm = () => {

    const { updateBug } = useBugs()
    const { closeModal } = useModal()
    const { socket } = useSocket()

    const [loading, setLoading] = useState(false)

    const fields = [
        {
            label: `Tell us what's wrong`,
            name: 'text',
            placeholder: 'Describe the error...',
            multiline: true,
        },
    ]
    
    // const { setUploading } = useUser()

    // const [imageData, setImageData] = useState(null)

    // const handleUpload = async () => {
        
    //     if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
    //     setUploading(true)
    //     const image = await uploadImage({ ...imageData })
    //     setUploading(false)
        
    //     if (image) return image
    //     else {
    //         console.log('error uploading image')
    //         return null
    //     }
    // }

    const handleSubmit = async data => {

        setLoading(true)
        const bug = await createEntry(data)
        setLoading(false)
        
        updateBug(bug)

        socket.emit('new_entry', bug)

        closeModal()

        return bug
    }

    return (
        
        <Card>

            <Card.Title
                title='Report Bug'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title='Tell us what happened'
                    titleVariant='headlineSmall'
                    subtitle='Please describe the bug.'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        fields={fields}
                        onSubmit={handleSubmit}
                    />
                </Card.Content>

            </Card>

        </Card>
    )
    // return (
    //     <View>
    //         <Form
    //             title='Report Bug'
    //             fields={fields}
    //             onCancel={closeBugModal}
    //             onSubmit={handleSubmit}
    //         />
                    
    //         {/* <ImagePickerMini onSelection={setImageData} /> */}
                    
    //     </View>
    // )
}

export default BugForm