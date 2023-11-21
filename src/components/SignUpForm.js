import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles/main'
import { ButtonPrimary, FormInput, RolePicker } from '.'

const SignUpForm = ({ setUser }) => {

	const {
        state,
        dispatch,
    } = useContext(AppContext)

	const { user } = state
	
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [role, setRole] = useState('driver')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [formReady, setFormReady] = useState(false)

	const onChangeRole = value => setRole(value)
	const onChangeEmail = value => setEmail(value)
	const onChangeUsername = value => setUsername(value)
	const onChangePassword = value => setPassword(value)
	const onChangeConfirmPassword = value => setConfirmPassword(value)

	useEffect(() => {
		initForm()
	}, [])

	useEffect(() => {
		// if (user) navigate('Home')
	}, [user])

	const initForm = async () => {
		const localEmail = await getEmailFromStorage()
		if (localEmail) setEmail(localEmail)
		setFormReady(true)
	}

	const getEmailFromStorage = async () =>
		await AsyncStorage
			.getItem('email')
			.then(localEmail => localEmail)

	const storeEmail = async email => {
		try {
			await AsyncStorage.setItem('email', email)
		} catch (err) {
			console.log('Error storing email.', err)
		}
	}

	const sendData = async user => {
		setLoading(true)
		storeEmail(user.email)
		const { data } = await axios.post('/api/signup', user)
		
		if (!data) {
			console.log('Sign up failed to create user.')
			return
		}
		await AsyncStorage.setItem('userToken', data.user.token)

		setUser(data.user)

		setLoading(false)
	}

	const onSubmit = () => {
		
		if (!email.length || !password.length || !confirmPassword.length)
		return console.log('Email and password required.')
		
		if (!username.length) return console.log('Username is required.')

		if (password !== confirmPassword)
		return console.log('Passwords do not match')
		
		sendData({ email, username, password, role })
	}

	return (
				
		<View style={defaultStyles.formContainer}>

			<View style={defaultStyles.form}>

				<Text style={defaultStyles.title}>Sign Up</Text>

				<RolePicker
					value={role}
					onChange={onChangeRole}
				/>

				<FormInput
					label='Email'
					value={email}
					onChangeText={onChangeEmail}
					placeholder='email'
					textContentType='emailAddress'
					autoCapitalize='none'
					keyboardType='email-address'
					style={defaultStyles.input}
				/>

				<FormInput
					label='Username'
					value={username}
					onChangeText={onChangeUsername}
					placeholder='username'
					textContentType='none'
					autoCapitalize='none'
					keyboardType='default'
					style={defaultStyles.input}
				/>

				<FormInput
					label='Password'
					value={password}
					onChangeText={onChangePassword}
					placeholder='password'
					textContentType='password'
					autoCapitalize='none'
					keyboardType='default'
					secureTextEntry={true}
					style={defaultStyles.input}
				/>

				<FormInput
					label='Confirm Password'
					value={confirmPassword}
					onChangeText={onChangeConfirmPassword}
					placeholder='password again'
					textContentType='password'
					autoCapitalize='none'
					keyboardType='default'
					secureTextEntry={true}
					style={defaultStyles.input}
				/>

				<ButtonPrimary
					disabled={loading}
					label={loading ? 'Signing Up' : 'Sign Up'}
					onPress={onSubmit}
				/>

			</View>

		</View>
	)
}

export default SignUpForm