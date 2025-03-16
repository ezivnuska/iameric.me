import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'react-native-paper'
import { Form, ModalContainer } from '@components'
import { useForm, useModal, useSocket, useUser } from '@context'
import { signup, signin } from '@utils/auth'

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

        const data = await signin(email, password)
        
        if (data) {

            if (data.error) {
                
                const { name, message } = data
                
                setFormError({ name, message })

            } else if (data.user) {

                if (formError) clearFormError()
    
                const { _id, username } = data.user
                
                setUser(data.user)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
    
                handleModalClose()
            }
        }
    }

    const handleSignup = async ({ email, username, password }) => {

        const { error, name, message, user } = await signup(email, password, username)
        
        if (error) {

            setFormError({
                name,
                message,
            })
            
        } else if (user) {

            const { _id, username } = user
            
            setUser(user)
            
            notifySocket('user_signed_in', {
                userId: _id,
                username,
            })
        }
    }

    return (
        <ModalContainer title={formType === 'up' ? 'Sign Up' : 'Sign In'}>

            {formType === 'up'
                ? <SignUpForm onSubmit={handleSignup} />
                : <SignInForm onSubmit={handleSignin} />
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

    const condition = useMemo(() => formFields && formFields.password?.length && (formFields.password === formFields.confirmPassword), [formFields])
    
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
                    condition,
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