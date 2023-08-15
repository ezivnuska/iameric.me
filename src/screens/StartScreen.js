import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import axios from 'axios'

const StartScreen = ({ navigation }) => {

    const creds = {
        customer: {
            email: 'customer@iameric.me',
            password: 'customer',
        },
        driver: {
            email: 'driver@iameric.me',
            password: 'driver',
        },
        vendor: {
            email: 'vendor@iameric.me',
            password: 'vendor',
        },
    }

    const { dispatch, state } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const connect = async type => {

        setLoading(true)
        
        const { email, password } = creds[type]
        
        console.log(`connecting as ${type}`)
		
        const response = await axios.
            post('/api/signin', { email, password })
        
        const user = response.data
        
        if (!user) {
            console.log('error authenticating user')
            setError('error authenticating user')
            return
        }

        console.log(`${user.username} connected`)
        
        await AsyncStorage.setItem('userToken', user.token)
        
        console.log('user token set')

        setLoading(false)

        const {
            profileImage,
            role,
            username,
            _id
        } = user

        dispatch({
            type: 'SET_USER',
            user: {
                profileImage,
                role,
                username,
                _id,
                email,
            }
        })
    }

    return (
        <View style={styles.container}>

            {loading
                ? <Text>Connecting...</Text>
                : (
                    <View>
                        <ButtonPrimary
                            label='Customer Experience'
                            onPress={() => connect('customer')}
                        />
                        
                        <ButtonPrimary
                            label='Vendor Experience'
                            onPress={() => connect('vendor')}
                        />
                
                        <ButtonPrimary
                            label='Driver Experience'
                            onPress={() => connect('driver')}
                        />
                    </View>
                )
            }

        </View>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        width: 300,
        marginTop: 20,
        marginHorizontal: 'auto',
    },
})