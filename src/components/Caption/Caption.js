import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, IconButton, ThemedText } from '@components'
import { useForm } from '@form'
import { useImages } from '@images'
import { setCaption } from '@utils/images'

const Caption = ({
    data = {},
    onCancel = null,
    onChange = null,
    active = null,
}) => {

    const {
        updateImage,
        closeImagesModal,
    } = useImages()

    const {
        clearForm,
        formError,
        formFields,
        setFormLoading,
    } = useForm()

    const [editing, setEditing] = useState(false)

    useEffect(() => {
        onChange(editing ? 'caption' : null)
    }, [editing])

    useEffect(() => {
        if (!active) setEditing(false)
    }, [active])

    const handleSubmit = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}
        
        setFormLoading(true)
        const image = await setCaption(data._id, formFields.caption)
        setFormLoading(false)

        if (!image) console.log('Error saving caption', err)
        else {
            updateImage(image)
            clearForm()
            closeImagesModal()
            return image
        }
    }

    const renderForm = () => (
        <Form
            // title={`${data?.caption ? 'Edit' : 'Add'} Caption`}
            data={data}
            fields={[
                {
                    label: `${data?.caption ? 'Edit' : 'Add'} Caption`,
                    name: 'caption',
                    placeholder: 'new caption...',
                    multiline: false,
                }
            ]}
            onCancel={closeImagesModal}
            onSubmit={handleSubmit}
        />
    )

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 10,
                        }}
                    >
                        <ThemedText size={18} color='#fff'>{editing ? 'Edit caption' : data.caption || 'No description'}</ThemedText>
                        <IconButton
                            name={editing ? 'close' : 'create-outline'}
                            size={24}
                            color={'#fff'}
                            onPress={() => setEditing(!editing)}
                        />
                    </View>

                    {editing && (
                        <Form
                            data={data}
                            fields={[
                                {
                                    name: 'caption',
                                    placeholder: 'new caption...',
                                    multiline: true,
                                }
                            ]}
                            onCancel={closeImagesModal}
                            onSubmit={handleSubmit}
                        />
                    )} 
                </View>
            </View>
        </View>
    )
}

export default Caption