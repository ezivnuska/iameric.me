import React, { useEffect } from 'react'
import { Screen } from './components'
import { useApp, useUser, useModal, useSocket } from '@context'
import { signin, signout } from '@utils/auth'
import { cleanStorage, setItem, storeToken } from '@utils/storage'
import { destroy } from '@utils'

const HomeScreen = props => {
    const { params } = props.route

    const { authRoute, setAuthRoute } = useApp()
    const { reset, user, setUser } = useUser()
    const { clearModals, addModal } = useModal()
    const { notifySocket } = useSocket()

    // SUPER UGLY

    const signinWithParams = async (email, password) => {
        const response = await signin(email, password)
        if (response) {
            setItem('email', response.user.email)
            storeToken(response.user.token)
            setUser(response.user)
            notifySocket('user_signed_in', {
                userId: response.user._id,
                username: response.user.username,
            })
            
            if (authRoute) {
                const routeName = authRoute.name
                setAuthRoute(null)
                props.navigation.navigate(routeName, authRoute.params)
            } else if (params) {
                props.navigation.navigate('Home')
            }
        }
        else console.log('could not sign in user with params')
    }

    useEffect(() => {
        if (params) {
            
            if (!user) {
                if (params.email && params.password) {
                    signinWithParams(params.email, params.password)
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
            addModal('AUTH')
        }
    }, [authRoute])

    // useEffect(() => {
    //     if (user) {
    //         if (authRoute) {
    //             const routeName = authRoute.name
    //             setAuthRoute(null)
    //             props.navigation.navigate(routeName, authRoute.params)
    //         }
    //     }
    // }, [user])

    const handleSignout = async () => {
        // console.log('handleSignout', params)
        if (params.signout && user) {
            const userId = user._id
            await signout(userId)
            notifySocket('user_signed_out', userId)
            cleanStorage()
            reset()
            clearModals()
        }
        props.navigation.navigate('Home', null)
    }

    const handleDestroy = async () => {
        if (params.destroy && user) {
            const userId = user._id
            await signout(userId)
            const { id } = await destroy(userId)
            notifySocket('user_signed_out', id)
            cleanStorage()
            reset()
            clearModals()
        }
        props.navigation.navigate('Home')
    }

    return (
        <Screen {...props}>

        </Screen>
    )
}

export default HomeScreen