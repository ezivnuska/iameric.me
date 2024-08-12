import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Screen } from './components'
import { ThemedText } from '@components'
import { Bipster } from '@modules'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'

export default props => {
    const { params } = props.route

    const { reset, user } = useApp()
    const { clearModal, setModal } = useModal()
    const { notifySocket } = useSocket()

    const [ authRoute, setAuthRoute ] = useState(null)

    useEffect(() => {
        if (params) handleSignout()
    }, [params])

    useEffect(() => {
        if (user) {
            if (authRoute) {
                props.navigation.navigate(authRoute)
                setAuthRoute(null)
            } else {
                props.navigation.navigate('Bips')
            }
        }
    }, [])

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

    const navigateToBip = () => {
        if (user) {
            props.navigation.navigate('Bips', { screen: 'BipList' })
        } else {
            setAuthRoute('Bips')
            setModal('AUTH')
        }
    }

    return (
        <Screen
            {...props}
            secure={false}
        >
            <View style={{ flex: 1 }}>
                <Intro />
                {/* {user
                    ? <Bipster />
                    : <Intro />
                } */}
                
                <Pressable
                    onPress={navigateToBip}
                >
                    <ThemedText color='tomato' bold>Bipster</ThemedText>
                </Pressable>

            </View>

        </Screen>
    )
}

const Intro = () => (
    <View
        style={{
            marginVertical: 10,
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                gap: 7,
            }}
        >
            <View style={{ flexGrow: 0, flexDirection: 'row', gap: 5 }}>
                <ThemedText bold size={18}>I am</ThemedText>
                <View style={{ flexGrow: 0, flexDirection: 'row' }}>
                    <ThemedText bold size={18} color='tomato'>Eric</ThemedText>
                    <ThemedText bold size={18}>.</ThemedText>
                </View>
            </View>

            <View style={{ flexGrow: 0 }}>
                <ThemedText size={18}>Welcome to my project.</ThemedText>
            </View>
        </View>
    </View>
)