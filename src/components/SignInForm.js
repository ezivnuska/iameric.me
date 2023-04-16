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
import { Link } from '@react-navigation/native'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'

const SignInForm = props => {
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

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
		AsyncStorage
			.setItem('userToken', newUser.token)
			.then(() => {
					dispatch({ type: 'SET_USER', user: newUser })
					navigate('private')
				})
				.catch(err => alert('Signin Error:', err))
	}

	const sendData = async user => {
		await AsyncStorage
			.setItem('email', user.email)
			.then(() => {
				setEmail(user.email)
			})

		axios
			.post('/api/signin', user)
			.then(({ data }) => {
				const { user } = data
				if (user) {
					setUser(Object.assign({}, user))
				} else {
					alert('Signin failed.')
				}    
			})
			.catch(err => {
				// alert('Error signing in')
				console.log('Failed sign in.', err)
			})
	}

	const onSubmit = () => {
		
		if (!email.length || !password.length)
			return alert('Email and password are required')
		
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
                style={defaultStyles.button}
                onPress={onSubmit}
            >
                <Text
                    style={defaultStyles.buttonLabel}
                    accessibilityLabel='Connect'
                >
                    Connect
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignInForm