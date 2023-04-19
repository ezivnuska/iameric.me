import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'

const SignInForm = ({ updateStatus }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

    const onChangeEmail = value => setEmail(value)
	const onChangePassword = value => setPassword(value)

	useEffect(() => {
		const getEmail = async () => {
			await AsyncStorage
				.getItem('email')
				.then(result => {
					if (!result) return console.log('no email found in local storage')
					setEmail(result)
				})
		}
		getEmail()
	}, [])

    const setUser = newUser => {
		updateStatus('Storing user in cookie...')
		AsyncStorage
			.setItem('userToken', newUser.token)
			.then(() => {
					updateStatus('User stored.')
					dispatch({ type: 'SET_USER', user: newUser })
					navigate('private')
				})
				.catch(err => alert('Signin Error:', err))
	}

	const sendData = async user => {
		updateStatus('Storing email...')
		await AsyncStorage
			.setItem('email', user.email)
			.then(() => {
				updateStatus('Email stored.')
				setEmail(user.email)
			})
		
		updateStatus('Attempting sign in...')
		axios
			.post('/api/signin', user)
			.then(({ data }) => {
				const { user } = data
				if (user) {
					updateStatus('Sign in successful.')
					setUser(user)
				}
				updateStatus('No user found.')
				setLoading(false)
			})
			.catch(err => {
				updateStatus('Error signing in.')
				setLoading(false)
				console.log('Failed sign in.', err)
			})
	}
	
	const onSubmit = () => {
		
		if (!email.length || !password.length)
			updateStatus('Email and password are required')
		
		setLoading(true)
		sendData({ email, password })
	}

    return (
        <View style={defaultStyles.form}>
					
            <Text style={defaultStyles.title}>Sign In</Text>
            
            <TextInput
                style={defaultStyles.input}
                // onBlur={onBlur}
                onChangeText={onChangeEmail}
                value={email}
                placeholder='Email'
                textContentType='emailAddress'
                autoCapitalize='none'
                keyboardType='email-address'
            />

            <TextInput
                style={defaultStyles.input}
                // onBlur={onBlur}
                onChangeText={onChangePassword}
                value={password}
                placeholder='Password'
                textContentType='password'
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={[defaultStyles.button, (loading ? defaultStyles.buttonDisabled : null)]}
                onPress={onSubmit}
				disabled={loading}
            >
                <Text
                    style={[defaultStyles.buttonLabel, (loading ? defaultStyles.buttonLabelDisabled : null)]}
                    accessibilityLabel='Connect'
                >
                    {loading ? 'Connect' : 'Connecting'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignInForm