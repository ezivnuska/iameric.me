import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    TextInput,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '.'
import classes from '../styles/classes'
import { AppContext } from '../AppContext'
import { saveLocally, getLocally } from '../utils/storage'
import { isValidEmail, signin } from '../utils/auth'
import { useTheme } from 'react-native-paper'

export default props => {
    
    const {
        dispatch,
        isLandscape,
        loading,
    } = useContext(AppContext)

    let fieldNames = [
        'email',
        'password',
    ]

    const [focused, setFocused] = useState(0)
    
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [formReady, setFormReady] = useState(false)
    
    const formFields = useMemo(() => ({ email, password }), [email, password])

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		const savedEmail = await getLocally('email')
		if (savedEmail) {
			setEmail(savedEmail)
		}
        validateFields()
	}

    useEffect(() => {
        validateFields()
    }, [email, password])

    // useEffect(() => {
    //     console.log('error', error)
    // }, [error])

    // useEffect(() => {
    //     console.log('formReady', formReady)
    // }, [formReady])
    
    useEffect(() => {
        // console.log('focused', focused)
        if (!formReady) setFormReady(true)
    }, [focused])

    const validateFields = async () => {
        const keys = Object.keys(formFields)
        let index = 0
        let field = null
        while (index <= keys.length && !field) {
            const key = keys[index]
            const isValid = await isFieldValid(key)
            if (!isValid) {
                field = true
                setFocused(index)
            } else {
                index++
            }
        }
    }

    const isFieldValid = async fieldName => {
        if (fieldName === 'email') {
            if (isValidEmail(email)) {
                if (error) setError(null)
                return true
            } else {
                setError({ name: fieldName, message: 'Email is not valid.' })
                return false
            }
        } else {
            if (!password.length) {
                setError({
                    name: fieldName,
                    message: `${fieldName} is required.`,
                })
                return false
            } else return true
        }
        
    }

    const setUser = ({
        _id, email, images, profileImage, role, token, username, exp,
    }) => dispatch({
        type: 'SET_USER',
        user: {
            _id, email, images, profileImage, role, token, username, exp,
        },
    })

    const isFieldFocused = name => {
        const keys = Object.keys(formFields)
        return keys[focused] === name
    }

    const onComplete = response => {
        setUser(response)
        dispatch({ type: 'CLOSE_MODAL' })
    }

    const hasError = name => error && error.name === name

	const onEnter = e => {
		if (e.code === 'Enter') submitData()
	}
	
	const submitData = async () => {
		if (error) {
			return console.log('Please correct form errors.')
		}

		dispatch({ type: 'SET_LOADING', loading: 'Signing in...' })

		await saveLocally('email', email)

		const data = await signin(email, password)
        
		if (!data || !data.user) {
			console.log('Error authenticating user')
            setError({ name: 'email', message: 'Authentication failed.' })
		} else {
            if (error) setError(null)
			onComplete(data.user)
		}

		dispatch({ type: 'SET_LOADING', loading: null })
	}

    return formReady ? (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: isLandscape ? 10 : 'auto',
            }}
        >
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: isLandscape ? 'flex-start' : 'stretch',
                    gap: 7,
                }}
            >
                <FormInput
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    placeholder='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    invalid={hasError('email')}
                    autoFocus={isFieldFocused('email')}
                    onKeyPress={onEnter}
                />

                <FormInput
                    label='Password'
                    value={password}
                    onChange={setPassword}
                    placeholder='password'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    invalid={hasError('password')}
                    autoFocus={isFieldFocused('password')}
                    onKeyPress={onEnter}
                />

                <View
                    style={{
                        paddingLeft: isLandscape ? 110 : 0,
                        flex: 1,
                    }}
                >
                    <ThemedText
                        style={{
                            marginBottom: 7,
                            color: '#f55',
                        }}
                    >
                        {error ? error.message : ' '}
                    </ThemedText>
        
                    <IconButton
                        type='primary'
                        label={loading ? 'Signing In' : 'Sign In'}
                        disabled={loading || error}
                        onPress={submitData}
                    />
                </View>

            </View>
        </View>
    ) : null
}

const FormInput = ({
    invalid,
    label,
    onChange,
    value,
    multiline = false,
    ...props
}) => {
    
    const theme = useTheme()
    
    const {
        isLandscape,
    } = useContext(AppContext)

    const [dirty, setDirty] = useState(false)
    const [inputHeight, setInputHeight] = useState()

    const onInput = value => {
        setDirty(true)
        onChange(value)
    }
    
    return (
        <View
            style={{
                flexBasis: 'auto',
                display: 'flex',
                flexDirection: isLandscape ? 'row' : 'column',
                justifyContent: 'flex-start',
                alignItems: isLandscape ? 'center' : 'flex-start',
                gap: isLandscape ? 10 : 0,
                width: '100%',
            }}
        >
            <View
                style={{
                    flexBasis: isLandscape ? 100 : 'auto',
                }}
            >
                <ThemedText
                    style={[
                        classes.formInputLabel,
                        {
                            paddingBottom: 2,
                            color: theme?.colors.inputLabel,
                        }
                    ]}
                >
                    {label}
                </ThemedText>
            </View>

            <View
                style={{
                    flexBasis: isLandscape ? '100%' : 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <View
                    style={[
                        classes.formInputContainer,
                        { borderBottomColor: (!invalid && !dirty) ? '#fff' : invalid ? '#f00' : '#1f1' },
                    ]}
                >
                    
                    <View
                        style={{
                            backgroundColor: multiline ? theme?.colors.modalBackground : theme?.colors.inputBackground,
                            height: multiline ? Math.max(35, inputHeight) : 40,
                        }}
                    >
                        <TextInput
                            value={value}
                            onChangeText={onInput}
                            onContentSizeChange={e => setInputHeight(e.nativeEvent.contentSize.height)}
                            style={[
                                multiline ? classes.formTextArea : classes.formInput,
                                {
                                    flex: 1,
                                    color: theme?.colors.inputText,
                                    placeholderTextColor: theme?.colors.inputPlaceholder,
                                    backgroundColor: 'transparent',
                                    lineHeight: multiline ? 22 : 40,
                                    height: multiline ? Math.max(35, inputHeight) : 40,
                                    flexWrap: multiline ? 'wrap' : 'nowrap',
                                    maxWidth: 300,
                                },
                            ]}
                            {...props}
                        />

                    </View>
                    
                </View>

            </View>

        </View>
    )
}