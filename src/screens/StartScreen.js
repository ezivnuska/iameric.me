import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    CenteredLoader,
    CenteredView,
    DefaultText,
    Screen,
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
        <Screen>
            {loading
                ? <CenteredLoader label='Connecting...' />
                : (
                    <CenteredView>
                        <View style={styles.experience}>
                            <DefaultText style={styles.caption}>
                                {`Create an order\nas a customer.`}
                            </DefaultText>
                            <ButtonPrimary
                                label='Order Takeout'
                                onPress={() => connect('customer')}
                            />
                        </View>
                        <View style={styles.experience}>
                            <DefaultText style={styles.caption}>
                                {`Confirm new orders,\nor add new products,\nas a vendor.`}
                            </DefaultText>
                            <ButtonPrimary
                                label='Handle Prep'
                                onPress={() => connect('vendor')}
                            />
                        </View>
                        <View style={styles.experience}>
                            <DefaultText style={styles.caption}>
                                {`Accept available orders,\nand complete them,\nas a driver.`}
                            </DefaultText>
                            <ButtonPrimary
                                label='Complete Deliveries'
                                onPress={() => connect('driver')}
                            />
                        </View>
                    </CenteredView>
                )
            }
        </Screen>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        // width: 300,
        // marginTop: 20,
        // marginHorizontal: 10,
    },
    experience: {
        marginVertical: 20,
        width: 250,
    },
    caption: {
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 20,
    },
})