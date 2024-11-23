import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, IconButton, ThemedText } from '@components'
import { useForm } from '@form'
import { useImages } from '@images'
import { useUser } from '@user'
import { setCaption } from '@utils/images'

const Caption = ({
    data = {},
    onCancel = null,
    onChange = null,
    active = null,
}) => {

    const {
        closeUserModal,
    } = useUser()

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
    const [captionText, setCaptionText] = useState(data.caption)

    useEffect(() => {
        onChange(editing ? 'caption' : null)
    }, [editing])

    useEffect(() => {
        if (!active && editing) setEditing(false)
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
            setCaptionText(image.caption)
            setEditing(false)
            // closeImagesModal()
            return image
        }
    }

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
                            // justifyContent: captionText ? 'space-between' : 'flex-start',
                            alignItems: 'center',
                            marginBottom: 10,
                            gap: 10,
                        }}
                    >
                        <ThemedText
                            size={18}
                            color='#fff'
                            style={{ flexGrow: captionText ? 1 : 0 }}
                        >
                            {captionText || 'Add a caption'}

                        </ThemedText>

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
                            onCancel={closeUserModal}
                            onSubmit={handleSubmit}
                        />
                    )} 
                </View>
            </View>
        </View>
    )
}

export default Caption