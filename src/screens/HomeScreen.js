import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { IconButtonLarge, ThemedText } from '@components'
// import { BipMap } from '@modules'
import { useApp } from '@app'
import { useUser } from '@user'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signin, signout } from '@utils/auth'
import { cleanStorage, setItem, storeToken } from '@utils/storage'
import { destroy } from '@utils'

const HomeScreen = props => {
    const { params } = props.route

    const { authRoute, setAuthRoute } = useApp()
    const { reset, user, setUser } = useUser()
    const { clearModal, setModal } = useModal()
    const { notifySocket } = useSocket()

    const handleSignin = async (email, password) => {
        const response = await signin(email, password)
        if (response) {
            setItem('email', response.email)
            storeToken(response.token)
            setUser(response)
            notifySocket('user_signed_in', {
                userId: response._id,
                username: response.username,
            })
        }
        else console.log('could not sign in user with params')
    }

    useEffect(() => {
        if (params) {
            if (!user) {
                if (params.email && params.password) {
                    handleSignin(params.email, params.password)
                }
            } else if (params.signout) {
                handleSignout()
            } else if (params.destroy) {
                handleDestroy()
            }
        }
    }, [params])

    useEffect(() => {
        if (authRoute) setModal('AUTH')
    }, [authRoute])

    useEffect(() => {
        if (user) {
            if (authRoute) {
                const routeName = authRoute
                setAuthRoute(null)
                props.navigation.navigate(routeName)
            }
        }
    }, [user])

    const handleSignout = async () => {
        if (params.signout && user) {
            const userId = user._id
            await signout(userId)
            notifySocket('user_signed_out', userId)
            cleanStorage()
            reset()
            clearModal()
        }
        props.navigation.navigate('Home')
    }

    const handleDestroy = async () => {
        if (params.destroy && user) {
            const userId = user._id
            await signout(userId)
            const { id } = await destroy(userId)
            notifySocket('user_signed_out', id)
            cleanStorage()
            reset()
            clearModal()
        }
        props.navigation.navigate('Home')
    }

    return (
        <Screen {...props}>
            
            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <View style={{ flexGrow: 0 }}>
                    <Intro />
                </View>

                <View
                    style={{
                        flexGrow: 1,
                        gap: 15,
                    }}
                >

                    <IconButtonLarge
                        name='people-outline'
                        label='Users'
                        onPress={() => props.navigation.navigate('Contacts')}
                    />

                    <IconButtonLarge
                        name='build-outline'
                        label='Work'
                        onPress={() => props.navigation.navigate('Work')}
                    />

                    <IconButtonLarge
                        name='list-outline'
                        label='Feed'
                        onPress={() => props.navigation.navigate('Feed')}
                    />

                </View>
                
            </View>

        </Screen>
    )
}

const Intro = () => (
    <View style={{ marginBottom: 10 }}>

        <View style={{ flexDirection: 'row', gap: 7 }}>
            
            <View style={{ flexGrow: 0, flexDirection: 'row', gap: 5 }}>
                
                <ThemedText bold size={18}>I am</ThemedText>
                
                <View style={{ flexGrow: 0, flexDirection: 'row' }}>
                    <ThemedText bold size={18} color='#777'>Eric</ThemedText>
                    <ThemedText bold size={18}>.</ThemedText>
                </View>

            </View>

            <View style={{ flexGrow: 0 }}>
                <ThemedText size={18}>Welcome to my progress.</ThemedText>
            </View>
        </View>

    </View>
)

export default HomeScreen