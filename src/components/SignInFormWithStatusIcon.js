import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
    View,
} from 'react-native'
import {
	FormInput,
} from '.'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'
import ButtonPrimary from './ButtonPrimary'

const SignInFormWithStatusIcon = ({ updateStatus, setUser }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

	const [formReady, setFormReady] = useState(false)
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [invalid, setInvalid] = useState(null)
	const [verifiedUser, setVerifiedUser] = useState(null)

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		const localEmail = await getEmailFromStorage()
		if (localEmail) setEmail(localEmail)
		setFormReady(true)
	}

	const getEmailFromStorage = async () =>
		await AsyncStorage
			.getItem('email')
			.then(localEmail => localEmail)

	useEffect(() => {
		if (verifiedUser) setUser(verifiedUser)
	}, [verifiedUser])

	const authenticateUser = async () => {
		setLoading(true)
		const user = await verifyUser()
		setLoading(false)
		storeEmail(email)
		setVerifiedUser(user)
		setPassword('')
	}

	const verifyUser = async () => await axios
		.post('/api/signin', { email, password })
		.then(({ data }) => {
			const { msg, user } = data
			if (msg) console.log('signin message:', msg)
			return user
		})
		.catch(err => {
			console.log('Error signing in.', err)
			return null
		})

	const storeEmail = async email => {
		try {
			await AsyncStorage.setItem('email', email)
		} catch (err) {
			console.log('Error storing email.', err)
		}
	}

	const validateEmail = async email => await axios
		.post('/api/user/get', { email })
		.then(({ data }) => {
			const { err, msg, user } = data
			if (err) console.log('Error getting user from email.', err)
			if (!user) console.log('Could not find user with email:', email)
			return user !== null
		})
		.catch(err => {
			console.log('Error getting user', err)
			return false
		})
	
	const onSubmit = async () => {
		
		if (!email.length || !password.length)
			updateStatus('Email and password are required.')
		
		
		authenticateUser()
	}

	const isValidEmail = () =>  email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)

    return (
        <View style={defaultStyles.form}>
					
            <Text style={defaultStyles.title}>Sign In</Text>

			<FormInput
				label='Email'
				value={email}
				onChange={value => setEmail(value)}
				placeholder='Email'
				textContentType='emailAddress'
				autoCapitalize='none'
				keyboardType='email-address'
				style={defaultStyles.input}
				isLoading={loading}
				isValid={isValidEmail()}
			/>

			<FormInput
				label='Password'
				value={password}
				onChange={value => setPassword(value)}
				placeholder='Password'
				textContentType='password'
				autoCapitalize='none'
				secureTextEntry={true}
				style={defaultStyles.input}
				isLoading={loading}
				isValid={password.length > 0}
			/>

			<ButtonPrimary
				disabled={loading}
				label={loading ? 'Signing in...' : 'Sign In'}
				onPress={onSubmit}
			/>

        </View>
    )
}

export default SignInFormWithStatusIcon