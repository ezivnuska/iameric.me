import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
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

// const API_PATH = process.env.API_PATH || '/api'
const API_PATH = '/api'

const SignUpForm = props => {

	const {
        state,
        dispatch,
    } = useContext(AppContext)

  const { user } = state
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChangeEmail = value => setEmail(value)
  const onChangeUsername = value => setUsername(value)
  const onChangePassword = value => setPassword(value)
  const onChangeConfirmPassword = value => setConfirmPassword(value)

  useEffect(() => {
    if (user) navigate('private')
  }, [user])

  const setUser = user => {
    AsyncStorage
      .setItem('userToken', user.token)
      .then(() => {
        console.log('userToken saved in local storage')
        // setState(state => ({ ...state, user }))
		dispatch({ type: 'SET_USER', user })
      })
      .catch(err => alert('Signin Error:', err))
  }

  const sendData = user => {
    axios
      .post(`${API_PATH}/signup`, user)
      .then(result => {
        console.log('result from signup request', result)
        setUser(result)
      })
      .catch(err => {
        alert('Failed to sign you up! If you already have an account, log in directly!');
        console.log('Error getting user.', err)
      })
  }

  const onSubmit = () => {
    
    if (!email.length || !password.length || !confirmPassword.length) {
      return alert('Email and password are required')
    }

    if (password !== confirmPassword) {
      return alert(`Passwords don't match` )
    }
    
    sendData({ email, username, password })
  }

	return (
				
		<View style={defaultStyles.form}>

			<Text style={defaultStyles.title}>Sign Up</Text>
			
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
				onChangeText={onChangeUsername}
				value={username}
				placeholder='Username'
				textContentType='username'
				autoCapitalize='none'
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

			<TextInput
				style={defaultStyles.input}
				// onBlur={onBlur}
				onChangeText={onChangeConfirmPassword}
				value={confirmPassword}
				placeholder='Confirm Password'
				textContentType='password'
				secureTextEntry={true}
			/>

			<TouchableOpacity
				style={defaultStyles.button}
				onPress={onSubmit}
			>
				<Text
					style={defaultStyles.buttonLabel}
					accessibilityLabel='Sign Up'
				>
					Sign Up
				</Text>
			</TouchableOpacity>

		</View>
	)
}

export default SignUpForm

const styles = StyleSheet.create({
	rootError: {
		color: 'red',
	},
	activity: {
		marginTop: 20,
	},
})