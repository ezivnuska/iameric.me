import React, { useEffect, useState } from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { unsubscribe } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import classes from '@styles/classes'
import {
    useApp,
    useAuth,
    useForm,
    useModal,
    useUser,
} from '@context'

export default () => {

    const {
        clearForm,
        clearFormError,
        formError,
        formLoading,
        setFormError,
        setFormLoading,
    } = useForm()

    const {
        signOut,
    } = useAuth()

    const { closeModal } = useModal()
    const { profile, clearUser } = useUser()

    const [confirmUsername, setConfirmUsername] = useState('')

    const [focused, setFocused] = useState(null)

    useEffect(() => {
        validateFields()
    }, [confirmUsername])

    const validateFields = () => {
        const isValid = validateField()
        if (!isValid) console.log(`username is invalid`)
        setFocused(0)
    }

    const validateField = () => {
        let isValid = true
        if (confirmUsername !== profile.username) {
            setFormError({ name: 'confirmUsername', message: 'Incorrect username.'})
            isValid = false
        }

        if (isValid && formError && formError.name === 'confirmUsername') {
            clearFormError()
        }

        return isValid
    }

    const onChange = value => {
        setConfirmUsername(value)
    }

    const hasError = () => {
        if (formError && formError.name === 'confirmUsername') {
            return formError.message
        }
        else return false
    }
    
    const onEnter = e => {
		if (e.code === 'Enter') submitFormData()
	}

    const submitFormData = async () => {
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        setFormLoading(true)
        
		const unsubscribed = await unsubscribe(profile._id)
        
        setFormLoading(false)

		if (!unsubscribed) {
            console.log('Error unsubscribing user: NULL')
            setFormError({ name: 'confirmUsername', message: 'Unsubscribe failed.' })
        } else {
            if (formError) clearFormError()
            signOut()
            clearUser()
            cleanStorage()
            clearForm()
            closeModal()
		}
    }

    const renderForm = () => (
        <View>
            <FormField
                label='Confirm Username'
                value={confirmUsername}
                error={hasError()}
                placeholder='username'
                textContentType='none'
                keyboardType='default'
                autoCapitalize='none'
                onChangeText={value => onChange(value)}
                autoFocus={true}
                onKeyPress={onEnter}
            />
            <IconButton
                type='primary'
                label={formLoading ? 'Burning...' : 'Burn it all.'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />
        </View>
    )
    
    return (
        <View>
            <View
                style={{ marginBottom: 20 }}
            >
                <ThemedText style={classes.headerSecondary}>
                    Delete Account and Data
                </ThemedText>

                <ThemedText>
                    Enter your username to close your account and 
                    permanently delete all of your data.
                </ThemedText>
            </View>

            {focused !== null ? renderForm() : null}
        </View>
    )
}

const FormField = ({ error, label, value, ...props }) => {

    const { isLandscape, theme } = useApp()

    const [initialValue, setInitialValue] = useState(null)
    const [dirty, setDirty] = useState(false)

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(value)
        }
    }, [])

    useEffect(() => {
        if (initialValue) console.log(`initial ${label} value set:`, initialValue)
    }, [initialValue])

    return (
        <View>
            <ThemedText
                style={[
                    classes.formInputLabel,
                    {
                        paddingBottom: 2,
                        color: theme?.colors.inputLabel,
                    },
                ]}
            >
                {label}
            </ThemedText>

            <View
                style={[
                    classes.formInputContainer,
                    { borderBottomColor: error ? '#f00' : '#1f1' },
                ]}
            >
                <View
                    style={{
                        backgroundColor: theme?.colors.inputBackground,
                        height: 40,
                    }}
                >
                    <TextInput
                        value={value}
                        multiline={false}
                        autoCorrect={false}
                        spellCheck={false}
                        style={[
                            classes.formInput,
                            {
                                color: theme?.colors.inputText,
                                placeholderTextColor: theme?.colors.inputPlaceholder,
                                backgroundColor: 'transparent',
                                lineHeight: 40,
                                height: 40,
                                flexWrap: 'nowrap',
                                maxWidth: 300,
                            },
                        ]}
                        {...props}
                    />
                </View>
                {error && <Text style={{ color: '#f00' }}>{error.message}</Text>}
            </View>
        </View>
    )
}