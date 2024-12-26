import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TextCopy, Screen } from '@components'
import { useApp, useUser, useModal, useSocket } from '@context'
import { signin, signout } from '@utils/auth'
import { cleanStorage, setItem, storeToken } from '@utils/storage'
import { destroy } from '@utils'

const HomeScreen = props => {
    const { params } = props.route

    const { authRoute, setAuthRoute } = useApp()
    const { reset, user, setUser } = useUser()
    const { clearModal, setModal } = useModal()
    const { notifySocket } = useSocket()

    // SUPER UGLY

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
        if (user) {
            props.navigation.navigate('Feed')
        }
    }, [])


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
        
        if (authRoute) {
            console.log('authRoute', authRoute)
            setModal('AUTH')
        }
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
                    
                </View>

                <View style={{ flexGrow: 1 }} />
                
            </View>

        </Screen>
    )
}

export default HomeScreen