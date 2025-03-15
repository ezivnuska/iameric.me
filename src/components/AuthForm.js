import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { Form, ModalContainer } from '@components'
import { useForm, useModal, useSocket, useUser } from '@context'
import { signup, signin } from '@utils/auth'
import { setItem, storeToken } from '@utils/storage'

const AuthForm = () => {
    
    const { authUser, setUser } = useUser()
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

    useEffect(() => {
        if (formReady) resetForm()
    }, [formType])

    useEffect(() => {
        if (authUser) handleModalClose()
    }, [authUser])

    const toggleFormType = () => {
        setFormType(formType === 'in' ? 'up' : 'in')
    }

    const handleModalClose = () => {
        resetForm()
        closeModal()
    }

    const handleSignin = async ({ email, password }) => {
        // console.log('email', email)
        // console.log('password', password)
        const response = await signin(email, password)
        
        if (response) {

            if (response.error) {
                console.log('SignIn Error:', response.msg)
                setFormError({
                    name: response.invalidField,
                    message: response.msg,
                })
            } else if (response.user) {

                if (formError) clearFormError()
    
                const { _id, username } = response.user
                
                setUser(response.user)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
    
                handleModalClose()
            }
        } else {
            return null
        }
    }

    const handleSignup = async ({ email, username, password, confirmPassword }) => {
        // if (password !== confirmPassword) {
        //     setFormError({
        //         name: 'confirmPassword',
        //         message: 'Passwords do not match.',
        //     })
        // } else {
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
                
                return newUser
            }
        // }
        // return null
    }

    return (
        <ModalContainer title={formType === 'up' ? 'Sign Up' : 'Sign In'}>

            {formType === 'up'
                ? <SignUpForm onCancel={handleModalClose} onSubmit={handleSignup} />
                : <SignInForm onCancel={handleModalClose} onSubmit={handleSignin} />
            }

            <Button
                mode='outlined'
                onPress={toggleFormType}
            >
                {formType === 'up' ? 'Sign In' : 'Sign Up'}
            </Button>

        </ModalContainer>
    )
}

const SignUpForm = ({ onSubmit }) => {

    const { formFields } = useForm()
    
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
            requirements: [
                {
                    condition: () => formFields.password?.length && formFields.password === formFields.confirmPassword,
                    errorMessage: 'Passwords do not match.'
                },
            ],

        },
    ]

    return (
        <Form
            fields={fields}
            onSubmit={onSubmit}
        />
    )
}

const SignInForm = ({ onSubmit }) => {
    
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
            fields={fields}
            onSubmit={onSubmit}
        />
    )
}

export default AuthForm