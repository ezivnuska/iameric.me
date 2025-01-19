import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, SimpleButton } from '@components'
import { useForm, useModal, useSocket, useUser } from '@context'
import { signin, signup } from '@utils/auth'
import { setItem, storeToken } from '@utils/storage'

const AuthForm = () => {
    
    const { user, setUser, signinUser } = useUser()
    const {
        formError,
        formReady,
        clearFormError,
        resetForm,
        setFormError,
    } = useForm()
    const { closeModal } = useModal()
    const { notifySocket } = useSocket()
        
    const [formType, setFormType] = useState('in')

    // useEffect(() => {
    //     if (type !== formType) setFormType(type)
    // }, [type])

    useEffect(() => {
        if (formReady) reset()
    }, [formType])

    useEffect(() => {
        console.log('user', user)
        if (user) handleModalClose()
    }, [user])

    const toggleFormType = () => {
        setFormType(formType === 'in' ? 'up' : 'in')
    }

    const handleModalClose = () => {
        // if (authRoute) setAuthRoute(null)
        resetForm()
        closeModal()
    }

    const handleSignin = async ({ email, password }) => {
        
        const connectedUser = await signinUser(email, password)
        
        if (connectedUser) {

            if (formError) clearFormError()

            const { _id, username } = connectedUser
            
            notifySocket('user_signed_in', {
                userId: _id,
                username,
            })

            handleModalClose()
        }
    }

    const handleSignup = async ({ email, username, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            setFormError({
                name: 'confirmPassword',
                message: 'Passwords do not match.',
            })
        } else {
            const newUser = await signup(email, password, username)
            if (newUser) {
                await setItem('email', email)
    
                const { _id, token, username } = newUser
                
                storeToken(token)
                setUser(newUser)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
                
                // resetForm()
                
                return newUser
            }
        }
        return null
    }

    return (
        <View
            style={{
                flexGrow: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                gap: 10,
            }}
        >
    
            {formType === 'up'
                ? <SignUpForm onCancel={handleModalClose} onSubmit={handleSignup} />
                : <SignInForm onCancel={handleModalClose} onSubmit={handleSignin} />
            }

            <SimpleButton
                label={formType === 'up' ? 'Sign In' : 'Sign Up'}
                onPress={toggleFormType}
                color='tomato'
            />

        </View>
    )
}

const SignUpForm = ({ onCancel, onSubmit }) => {
    
    const fields = [
        {
            label: 'Email',
            name: 'email',
            placeholder: 'email...',
            multiline: false,
            autoCapitalize: 'none',
        },
        {
            label: 'Username',
            name: 'username',
            placeholder: 'username...',
            multiline: false,
        },
        {
            label: 'Password',
            name: 'password',
            placeholder: 'password...',
            multiline: false,
            type: 'password',
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            placeholder: 'password again...',
            multiline: false,
            type: 'password',
        },
    ]

    return (
        <Form
            title='Sign Up'
            fields={fields}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

const SignInForm = ({ onCancel, onSubmit }) => {
    
    const fields = [
        {
            label: 'Email',
            name: 'email',
            placeholder: 'email',
            multiline: false,
            autoCapitalize: 'none',
        },
        {
            label: 'Password',
            name: 'password',
            placeholder: 'password',
            multiline: false,
            type: 'password',
        },
    ]

    return (
        <Form
            title='Sign In'
            fields={fields}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

export default AuthForm