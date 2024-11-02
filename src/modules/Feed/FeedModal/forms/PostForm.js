import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import { useFeed } from '@feed'
import { useSocket } from '@socket'
import {
    createPost,
    getFields,
    validateFields,
} from './utils'

const PostForm = ({ onSubmit, onCancel }) => {

    const initialState = { text: '' }

    const { user } = useApp()
    const { socket } = useSocket()

    const {
        clearForm,
        clearFormError,
        focused,
        formError,
        formFields,
        formLoading,
        formReady,
        getDirty,
        getError,
        getFocus,
        initForm,
        markDirty,
        setFocus,
        setFormError,
        setFormLoading,
        setFormReady,
        setFormValues,
    } = useForm()

    const {
        addPost,
    } = useFeed()

    const [initialValues, setInitialValues] = useState(null)

    const {
        text,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const init = async () => {
            const fields = getFields(initialState)
            setInitialValues(fields)
        }
        init()
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validate)
    }, [text])

    const validate = name => {
        let isValid = true
        switch (name) {
            case 'text':
                if (!text.length) {
                    setFormError({ name, message: 'Form invalid.'})
                    isValid = false
                }
                break
            default:
                // console.log('No field to validate')
        }

        if (isValid && getError(name)) {
            clearFormError()
            setFocus(0)
        } else {
            setFocus(name)
        }

        return isValid
    }

    const onChange = (key, value) => {
        if (!getDirty(key)) markDirty(key)
        setFormValues({ ...formFields, [key]: value })
    }
    
    const onEnter = e => {
		if (e.code === 'Enter') submitFormData()
	}

    const submitFormData = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        const { _id } = user

        let newPost = {
            author: _id,
            text,
        }
        
        setFormLoading(true)
        const post = await createPost(newPost)
        setFormLoading(false)
        
        if (!post) console.log('Error saving post')
        else {
            clearForm()
            socket.emit('new_post', post)
            // addPost(post)
            onSubmit(post)
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label='Add Post'
                value={text}
                error={getError('text')}
                placeholder='say something...'
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                onChangeText={value => onChange('text', value)}
                autoFocus={getFocus('text')}
                onKeyPress={onEnter}
                dirty={getDirty('text')}
                multiline
            />
        </>
    )

    return focused !== null ? (
        <View
            style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            <FormHeader
                title='New Post'
                close={onCancel}
            />

            {renderFields()}

            <SimpleButton
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}

export default PostForm