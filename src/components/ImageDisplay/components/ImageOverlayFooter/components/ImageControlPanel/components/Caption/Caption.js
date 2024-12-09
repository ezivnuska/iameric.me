import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, IconButton, IconButtonLarge, DefaultText } from '@components'
import { useForm, useUser } from '@context'
import { setCaption } from '@utils/images'

const Caption = ({
    data = {},
    onCancel = null,
    onChange = null,
    active = null,
}) => {

    const { updateImage } = useUser()

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
            return image
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                {captionText
                    ? (
                        <View
                            style={{
                                display: 'flex',
                                flex: 1,
                                gap: 10,
                            }}
                        >
                            
                            {editing && (
                                // <View
                                //     style={{
                                //         width: '100%',
                                //         flexDirection: 'row',
                                //         justifyContent: 'space-between',
                                //         gap: 10,
                                //     }}
                                // >
                                //     <View
                                //         style={{
                                //             // flexGrow: 1,
                                //             // backgroundColor: '#333',
                                //             // borderRadius: 10,
                                //             // overflow: 'hidden',
                                //             // paddingHorizontal: 10,
                                //             // paddingVertical: 5,
                                //         }}
                                //     >
                                <View
                                    style={{
                                        // flex: 1,
                                        flexDirection: 'row',
                                        // justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        gap: 10,
                                    }}
                                >
                                    <View style={{ flex: 9 }}>
                                        <DefaultText color='#ccc'>Original:</DefaultText>
                                    </View>
                                
                                    <View
                                        style={{
                                            flex: 1,
                                            // flexBasis: 'auto',
                                            // justifyContent: 'flex-start',
                                            alignContent: 'flex-end',
                                            //...positioning
                                            marginBottom: 3,
                                            // paddingVertical: 5,
                                        }}
                                    >
                                        <IconButton
                                            name={editing ? 'close' : 'create-outline'}
                                            size={24}
                                            color='#fff'
                                            onPress={() => setEditing(!editing)}
                                            // transparent
                                        />
                                    </View>
                                </View>
                            )}

                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <View
                                    style={{
                                        // flexGrow: 1,
                                        flexShrink: 1,
                                        backgroundColor: '#333',
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                    }}
                                >
                                    <DefaultText size={18} color='#fff'>
                                        {captionText}
                                    </DefaultText>
                                </View>
                                
                                {!editing && (
                                    <View
                                        style={{
                                            flexBasis: 'auto',
                                            justifyContent: 'flex-start',
                                            alignContent: 'flex-end',
                                            //...positioning
                                            marginBottom: 3,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        <IconButton
                                            name={'create-outline'}
                                            size={24}
                                            color='#fff'
                                            onPress={() => setEditing(!editing)}
                                            // transparent
                                        />
                                    </View>
                                )}

                            </View>
                        </View>
                    )
                    : !editing
                        ? (
                            <IconButtonLarge
                                name='create-outline'
                                label='Add a caption'
                                size={32}
                                color='#fff'
                                onPress={() => setEditing(!editing)}
                                transparent
                                style={{ marginBottom: 3 }}// positioning adjustment
                            />
                        )
                        : (
                            <IconButton
                                name='close'
                                size={32}
                                color='#fff'
                                onPress={() => setEditing(!editing)}
                                style={{ marginBottom: 3 }}// positioning adjustment
                            />
                        )
                }
            </View>


            {editing && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}
                >
                    <View style={{ flex: 9, gap: 10 }}>
                        
                        <DefaultText color='#ccc'>Edited:</DefaultText>
                        
                        <Form
                            data={data}
                            fields={[
                                {
                                    name: 'caption',
                                    placeholder: 'new caption...',
                                    multiline: true,
                                }
                            ]}
                            onCancel={onCancel}
                            onSubmit={handleSubmit}
                        />

                    </View>
                </View>
            )}
        </View>
    )
}

export default Caption