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
import ButtonPrimary from './ButtonPrimary'

const SignInForm = ({ updateStatus, setUser }) => {

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

	const sendData = async user => {
		updateStatus('Storing email...')
		setLoading(true)
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
				setLoading(false)
				const { err, user } = data
				if (err) {
					return updateStatus(err)
				}
				if (user) {
					updateStatus('Sign in successful.')
					setUser(user)
				}
			})
			.catch(err => {
				updateStatus('Error signing in.')
				setLoading(false)
				console.log('Error signing in.', err)
			})
	}
	
	const onSubmit = () => {
		
		if (!email.length || !password.length)
			updateStatus('Email and password are required.')
		
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

			<ButtonPrimary
				disabled={loading}
				label='Sign In'
				altLabel='Signing in...'
				onPress={onSubmit}
			/>

        </View>
    )
}

export default SignInForm