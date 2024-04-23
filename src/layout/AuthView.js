import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    AuthModal,
    Label,
    ThemedText,
} from '@components'
import {
    Header,
    UserView,
} from '@layout'
import {
    UserContextProvider,
    // FormContextProvider,
    useApp,
    useAuth,
    useForm,
    useUser,
} from '@context'
import {
    StartScreen,
} from '@screens'
import {
    loadUser,
} from '@utils/user'
// import { AppNavigation } from '@navigation'

export default () => {

    const auth = useAuth()
    const { admin } = useApp()
    const { authStatus, authToken, setAuthModal } = auth
    const form = useForm()
    const { profile, clearUser, setUser } = useUser()

    useEffect(() => {
        const init = async () => {
            const payload = await loadUser(authToken)
            if (!payload) console.log('could not load user')
            else setUser(payload)
            return null
        }

        if (authStatus) {
            if (!profile) init()
            else clearUser()
        }
    }, [authStatus])

    const renderItems = (state, keysRequired) => {
        const keys = Object.keys(state)
        return (
            <View>
                {keys.map((key, index) => {
                    if (typeof state[key] !== 'function' && keysRequired.indexOf(key) > -1) {
                        // console.log(' ')
                        // console.log(key)
                        // console.log(state[key])
                        return <ThemedText key={`item-${index}`}>{`${key}: ${state[key]}`}</ThemedText>
                    }
                })}
            </View>
        )
    }

    return (
        <View>
            <Label
                label='Auth Layer'
                visible={admin}
            >
                {renderItems(auth, ['authStatus', 'authLoading'])}
            </Label>
            <Label
                label='Form Layer'
                visible={admin}
            >
                {renderItems(form, ['formLoading'])}
            </Label>
            {/* <AppNavigation /> */}
            <Header />
            {authToken ? (
                <UserContextProvider token={authToken}>
                    <UserView />
                </UserContextProvider>
            ) : (
                <StartScreen />
            )}
            <AuthModal />
        </View>
    )
}