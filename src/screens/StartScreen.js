import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
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

    const [ loading, setLoading ] = useState(false)

    const connect = async role => {

        setLoading(true)
        
        const { email, password } = creds[role]
        
        console.log(`connecting as ${role}`)
		
        const user = await axios.
            post('/api/signin', { email, password }).
            then(({ data }) => data)

        if (!user) return console.log('error authenticating user')
        
        await AsyncStorage.setItem('userToken', user.token)
        
        setLoading(false)
		
        dispatch({ type: 'SET_USER', user })
    }

    return (
        <View style={styles.container}>

            {loading
                ? <ActivityIndicator size='large' />
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