import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { Bipster } from '@modules'

export default props => {
    const { params } = props.route

    const { reset, user } = useApp()
    const { clearModal } = useModal()
    const { notifySocket } = useSocket()

    useEffect(() => {
        if (params) handleSignout()
    }, [params])

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

    return (
        <Screen
            {...props}
            secure={false}
        >
            <View style={{ flex: 1 }}>

                {user
                    ? <Bipster />
                    : <Intro />
                }

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